import { JobRequest } from "../models/jobRequests.js";


//create job
const createJob = async (req, res, next) => {
    try {
        const jobRequest = new JobRequest(req.body);
        await jobRequest.save();
        return res.status(201).json({ message: 'Job Created Succesdfully', jobRequest })

    } catch (error) {
        next(error);
    }
}

//get all jobs
const getallJobs = async (req, res, next) => {
    try {
        const jobRequest = await JobRequest.find();
        res.status(200).json(jobRequest);


    } catch (error) {
        next(error);

    }


}

//get job by id

const getJobById = async (req, res, next) => {
    try {
        const jobRequest = await JobRequest.findById(req.params.id);

        if (!jobRequest) {
            return res.status(404).json({ message: "job Not Found" });
        }

        return res.status(200).json(jobRequest);
    } catch (error) {
        next(error);
    }
}

//delete job
const deleteJob = async (req, res, next) => {
    try {
        const jobRequest = await JobRequest.findByIdAndDelete(req.params.id);

        if (!jobRequest) {
            return res.status(404).json({ message: "job Not Found" });
        }

        return res.status(200).json({ message: "Job deleted successfully" });

    } catch (error) {
        next(error);
    }
}

//update

const updateJobStatus = async (req, res, next) => {

  try {

        const { status } = req.body;

        const jobRequest = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!jobRequest) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job status updated successfully",
            jobRequest
        });

    } catch (error) {
        next(error);
    }
}


export { createJob, getallJobs, getJobById, updateJobStatus, deleteJob};