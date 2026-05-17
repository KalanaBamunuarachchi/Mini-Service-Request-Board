import JobCard from "@/components/JobCard";
import Link from "next/link";
import { getJobs } from "@/lib/api";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
  }>;
}>) {

  const { search, category, status } = await searchParams;

  const jobs = await getJobs(
    search,
    category,
    status
  );

  return (
    <main className="max-w-5xl mx-auto p-6 w-full">
      <div className="flex items-center gap-6 mb-8">

        <h1 className="text-xl font-semibold">
          Mini Services
        </h1>

        <form className="flex items-center gap-4 flex-1 justify-center">

          <input
            type="text"
            name="search"
            placeholder="Search jobs..."
            defaultValue={search}
            className="border border-gray-300 px-3 py-2 w-64"
          />

          <select
            name="category"
            defaultValue={category}
            className="border border-gray-300 px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
          </select>

          <select
            name="status"
            defaultValue={status}
            className="border border-gray-300 px-3 py-2"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <button type="submit" className="border border-gray-300 px-4 py-2 bg-white hover:bg-gray-50">
            Apply
          </button>

        </form>

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
