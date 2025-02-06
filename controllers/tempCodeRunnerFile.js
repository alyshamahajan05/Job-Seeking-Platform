export const postJob = catchASyncError(async (req, res, next) => {
    const {role} = req.user;
    if(role !== 'Employer') {
        return next(new ErrorHandler('Only employer can post a job', 400));
    }
    const {title, description, category, salary, location, salaryfrom, salaryTo} = req.body; 

    if(!title || !description || !category || !location) {
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