import { Job } from "@/types/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//get Jobs
export async function getJobs() : Promise<Job[]>  {
    const response = await fetch(`${API_URL}/api/jobs`);

    if (!response.ok) {
        throw new Error("Failed to fetch Jobs")
    }
    
    return response.json();
}

//create new job
export async function createJob(jobData: unknown) {

  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
}

// get job via id
export async function getJobById(id: string) {

  const response = await fetch(`${API_URL}/api/jobs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
}
//update status
export async function updateJobStatus(
  id: string,
  status: string
) {

  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
}

//delete job
export async function deleteJob(id: string) {

  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return response.json();
}
