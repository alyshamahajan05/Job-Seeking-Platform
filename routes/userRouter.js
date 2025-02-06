import express from 'express';
import {logout, login ,register,getuser} from '../controllers/userController.js';
import {isAuthorised} from '../middlewares/auth.js';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorised, logout);
router.get("/getuser", isAuthorised, getuser);

export default router;