import { catchASyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {Application} from '../models/applicationSchema.js';
import cloudinary from 'cloudinary';
import {Job} from '../models/jobSchema.js';

export const employerGetApplications = (async (req, res) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can access this', 400));
    }
    const {_id} = req.user;
    const applications = await Application.find({'employerId.user': _id});
    res.status(200).json({
        success: true,
        applications,
    });
});

export const jobSeekerGetApplications = (async (req, res) => {
    const {role} = req.user;
    if(role !== 'Job Seeker') {
        return next(new ErrorHandler('Only Job Seeker can access this', 400));
    }
    const {_id} = req.user;
    const applications = await Application.find({'applicantId.user': _id});
    res.status(200).json({
        success: true,
        applications,
    });
});

export const jobSeekerDeleteApplication = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Job Seeker') {
        return next(new ErrorHandler('Only Job Seeker can access this', 400));
    }
    const {id} = req.params;
    const application = await Application.findById(id);
    if(!application) {
        return next(new ErrorHandler('Application does not exist', 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application deleted successfully",
    });
})

export const postApplication = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Job Seeker') {
        return next(new ErrorHandler('Only Job Seeker can access this', 400));
    }
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Please upload your resume', 400));
    }
    const {resume} = req.files;
    const allowedFormats = ['image/jpeg','image/png','image/webp']
    if(!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler('Please upload a valid resume(PNG, JPG OR WEBP)', 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "unknown error");
        return next(new ErrorHandler(' error uploading resume', 500));
    }
    const {name, email, coverLetter, phone, linkedIn, github, jobId} = req.body;
    const applicantId = {
        user: req.user._id,
        role: "Job Seeker",
    };

    
    if(!jobId) {
        return next(new ErrorHandler('Job not found!!', 400));
    };

    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler('Job not found!!', 400));
    }
    const employerId = {
        user: jobDetails.JobPostedBy,
        role: "Employer",
    };
    if(!name || !email || !coverLetter || !phone || !linkedIn || !github || !applicantId || !employerId || !resume){
        return next(new ErrorHandler("please fill all Details", 400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        linkedIn,
        github,
        applicantId,
        employerId,
        resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});