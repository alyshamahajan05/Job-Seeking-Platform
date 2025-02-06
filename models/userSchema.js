import mongoose from 'mongoose';
import validator from 'validator';//for email validation
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [30, 'Name must be at most 30 characters long']
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        required: [true, "Please provide a phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [30, 'Password must be at most 30 characters long'],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide a role"],
        enum: ['Job Seeker', 'Employer'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

//encrypting password before saving(hashing)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//genrate jwt token for authorization
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

export const User = mongoose.model('User', userSchema);
