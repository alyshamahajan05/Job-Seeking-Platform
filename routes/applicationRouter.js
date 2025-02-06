import express from 'express';
import {employerGetApplications,jobSeekerDeleteApplication,jobSeekerGetApplications, postApplication} from '../controllers/applicationController.js';
import {isAuthorised} from '../middlewares/auth.js';
const router = express.Router();

router.get("/employer/getall", isAuthorised,employerGetApplications);
router.get("/jobseeker/getall", isAuthorised,jobSeekerGetApplications);
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplication);
router.post("/post", isAuthorised, postApplication);
export default router;