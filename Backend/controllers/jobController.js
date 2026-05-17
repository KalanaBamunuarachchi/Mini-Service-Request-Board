import { JobRequest } from "../models/jobRequests.js";

//regexr safe
const regexSafe = (text) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

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
        const { category, status, search } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (status) {
            filter.status = status;
        }

        if (search) {
            const safeSearch = regexSafe(search);

            filter.$or = [
                {
                    title: {
                        $regex: safeSearch,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: safeSearch,
                        $options: "i"
                    }
                }
            ];
        }

        const jobRequest = await JobRequest.find(filter);

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

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const jobRequest = await JobRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!jobRequest) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({
            message: "Job status updated successfully",
            jobRequest
        });

    } catch (error) {
        next(error);
    }
}


export { createJob, getallJobs, getJobById, updateJobStatus, deleteJob };