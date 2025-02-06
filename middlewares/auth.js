import { catchASyncError } from './catchAsyncError.js' 
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js';

export const isAuthorised = catchASyncError(async (req, res, next) => {
    const {token} = req.cookies;  //when logged in then only we have token
    if(!token){
        return next(new ErrorHandler('Login first to access this resource', 400));
    }
    //verify token if its valid or from the same source
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //user saved in token

    req.user = await User.findById(decoded.id); //get user from db

    next(); //move to next middleware
});
