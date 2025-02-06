import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [100, 'Your name cannot exceed 100 characters']
    },
    email: {
        type: String,
        validator: [validator.isEmail, 'Please enter a valid email address'],
        required: [true, 'Please enter your email address'],
    },
    coverLetter: {
        type: String,
        required: [true, 'Please provide a cover letter'],
        //maxLength: [500, 'Your cover letter cannot exceed 500 characters']
    },
    phone: {
        type: Number,
        required: [true, 'Please enter your phone number'],
    },
    linkedIn: {
        type: String,
        required: [true, 'Please enter your LinkedIn URL'],
    },
    github: {
        type: String,
        required: [true, 'Please enter your GitHub URL'],
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        }
    },
    applicantId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Job Seeker'],
        },
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Employer'],
        },
    },
});

export const Application = mongoose.model('Application', applicationSchema);