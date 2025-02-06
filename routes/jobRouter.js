import express from 'express';
import {getmyJobs, postJob, getAllJobs, updateJob, deleteJob, getSingleJob } from '../controllers/jobController.js';
import {isAuthorised} from '../middlewares/auth.js';
const router = express.Router();


router.get('/getall', getAllJobs);
router.post('/postJob', isAuthorised, postJob);
router.get('/getmyJobs', isAuthorised, getmyJobs);
router.put('/update/:id', isAuthorised, updateJob);
router.delete('/delete/:id', isAuthorised, deleteJob);
router.get('/:id', isAuthorised, getSingleJob);


export default router;