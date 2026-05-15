import { Router } from "express";
import { createJob, deleteJob, getallJobs, getJobById, updateJobStatus } from "../controllers/jobController.js";

const jobRouter = Router();

jobRouter.post('/jobs',createJob);
jobRouter.get('/jobs', getallJobs);
jobRouter.get('/jobs/:id',getJobById);
jobRouter.delete('/jobs:id',deleteJob);
jobRouter.patch('/jobs:id',updateJobStatus);

export default jobRouter;