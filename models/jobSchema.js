import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        minLength: [3, "Title cannot be less than 3 characters"],
        maxLength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide job description"],
        minLength: [10, "Description cannot be less than 10 characters"],
        maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
    category: {
        type: String,
        required: [true, "Please provide job category"],
        enum: {
            values: [
                'Graphics & Design',
                'Mobile App Development',
                'Frontend Web Development',
                'MERN Stack Development',
                'Account & Finance',
                'Artificial Intelligence',
                'Video Animation',
                'MEAN Stack Development',
                'MEVN Stack Development',
                'Data Entry Operator'
            ],
            message: "Please select a valid category for the job"
        }
    },
    jobType: {
        type: String,
        required: [true, "Please provide job type"],
        enum: {
            values: [
                'Full Time',
                'Part Time',
                'Remote',
                'Freelance'
            ],
            message: "Please select a valid job type"
        }
    },
    location: {
        type: String,
        required: [true, "Please provide job location"],
    },
    salary: {
        type: Number,
        validate: {
            validator: function (value) {
                return !(this.salaryfrom || this.salaryTo) || !value;
            },
            message: "Provide either a fixed salary or a salary range, not both"
        }
    },
    salaryfrom: {
        type: Number,
        min: [1000, "Salary range must be at least 1000"],
        max: [1000000, "Salary range cannot exceed 1,000,000"]
    },
    salaryTo: {
        type: Number,
        min: [1000, "Salary range must be at least 1000"],
        max: [1000000, "Salary range cannot exceed 1,000,000"],
        validate: {
            validator: function (value) {
                return !this.salaryfrom || value > this.salaryfrom;
            },
            message: "SalaryTo must be greater than SalaryFrom"
        }
    },
    expired: {
        type: Boolean,
        default: false,
    },
    JobPostedOn: {
        type: Date,
        default: Date.now,
    },
    JobPostedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Job = mongoose.model('Job', jobSchema);
