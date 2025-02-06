import { catchASyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {Job} from '../models/jobSchema.js';

export const getAllJobs = catchASyncError(async (req, res, next) => {
    const jobs = await Job.find({expired: false});

    res.status(200).json({
        success: true,
        jobs,
    });
});

export const postJob = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can post a job', 400));
    }
    const {title, description, category,jobType, salary, location, salaryfrom, salaryTo} = req.body; 

    if(!title || !description || !category || !location ||!jobType) {
        return next(new ErrorHandler('Please fill all job details', 400));
    }
    if(!salary && (!salaryfrom || !salaryTo)) {
        return next(new ErrorHandler('Please either provide salary or ranged salary', 400));
    }
    if(salary && salaryfrom && salaryTo) {
        return next(new ErrorHandler('cannot enter fixed and ranged salary together', 400));
    }
    const JobPostedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        location,
        jobType,
        salary,
        salaryfrom,
        salaryTo,
        JobPostedBy,
    });

    res.status(201).json({
        success: true,
        message: 'Job posted successfully',
        job,
    });

});

export const getmyJobs = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can access this', 400));
    }
    const jobs = await Job.find({JobPostedBy: req.user._id});

    res.status(200).json({
        success: true,
        jobs,
    });
});

export const updateJob = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can access this', 400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job) {
        return next(new ErrorHandler('Job does not exist', 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: 'Job updated successfully',
        job,
    });
});

export const deleteJob = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can access this', 400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job) {
        return next(new ErrorHandler('Job does not exist', 404));
    }
    await job.deleteOne();
    res.status(200).json({
   
     success: true,
        message: 'Job deleted successfully',
    });
});

export const getSingleJob = catchASyncError(async(req,res,next)=>{
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found!", 404));
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid ID/Cast Error ", 400))
    }
})