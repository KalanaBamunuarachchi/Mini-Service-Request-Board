import Link from "next/link";
import { Job } from "@/types/job";

type JobCardProps = Readonly<{
    job: Job
}>;

export default function JobCard({ job }: JobCardProps) {
    return (
        <Link href={`/jobs/${job._id}`}>
            <div className="border border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer mb-6">

        <div className="flex items-start justify-between mb-3">

          <div>
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="text-sm text-gray-500">
              {job.location}
            </p>
          </div>

          <div className="text-right">
            <p className="font-medium">
              {job.status}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <p className="text-gray-700">
          {job.category}
        </p>

      </div>
        </Link>

    )
}