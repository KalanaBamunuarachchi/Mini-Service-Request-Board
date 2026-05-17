"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateJobStatus, deleteJob } from "@/lib/api";

type JobActionsProps = Readonly<{
  jobId: string;
  currentStatus: string;
}>;

export default function JobStatus({
  jobId,
  currentStatus,
}: JobActionsProps) {

  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);

  const handleUpdateStatus = async () => {

    try {

      await updateJobStatus(jobId, status);

      router.refresh();

    } catch (error) {

      console.error(error);

    }

  };

  const handleDeleteJob = async () => {

    const confirmed = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteJob(jobId);

      router.push("/");

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div className="flex items-center gap-2">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 px-3 py-2 bg-white"
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>
      <button
        onClick={handleUpdateStatus}
        className="border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        Update
      </button>

      <button onClick={handleDeleteJob} className="bg-red-500 text-white px-6 py-2 hover:bg-red-600 transition-colors">
        Delete
      </button>

    </div>
  );
}