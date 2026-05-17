import JobCard from "@/components/JobCard";
import Link from "next/link";
import { getJobs } from "@/lib/api";

export default async function Home() {

  const jobs = await getJobs();





  return (
    <main className="max-w-5xl mx-auto p-6 w-full">
      <div className="flex items-center gap-6 mb-8">

        <h1 className="text-xl font-semibold">
          Job Board
        </h1>

        <div className="flex items-center gap-4 flex-1 justify-center">

          <input
            type="text"
            placeholder="Search jobs..."
            className="border border-gray-300 px-3 py-2 w-64"
          />

          <select className="border border-gray-300 px-3 py-2">
            <option>Category</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Painting</option>
          </select>

        </div>

        <Link
          href="/jobs/new"
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition-colors"
        >
          Post Job
        </Link>

      </div>
      <div className="max-w-3xl mx-auto">
        {jobs.length === 0 ? (

          <div className="flex justify-center pt-16">
            <p className="text-gray-500 text-lg">
              No jobs found
            </p>
          </div>

        ) : (

          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))

        )}
      </div>
    </main>
  );
}
