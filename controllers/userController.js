import { catchASyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js'
import { sendToken } from '../utils/jwtToken.js';


export const register = catchASyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler('Please fill all the fields', 400));
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler('Email already registered!!'));
    }
    const user = await User.create({
        name, 
        email, 
        phone, 
        role, 
        password,
    });
    sendToken(user, 200, res, 'User registered successfully');
});

export const login = catchASyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler('Please fill email, password and role', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }
    if(user.role !== role){
        return next(new ErrorHandler('Invalid role', 400));
    }
    sendToken(user, 200, res, 'User logged in successfully');
});

export const logout = catchASyncError(async (req, res, next) => {
    res.status(201).cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: 'User Logged out successfully!!'
    });
});

export const getuser = catchASyncError(async (req, res, next) => {
    const user = req.user; // Set by the `isAuthorised` middleware
    if (!user) {
        return next(new ErrorHandler('User not found', 401)); // Unauthorized if no user
    }
    res.status(200).json({
        success: true,
        user,
    });
});
