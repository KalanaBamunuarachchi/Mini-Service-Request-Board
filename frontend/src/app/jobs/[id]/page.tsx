import Link from "next/link";
import { getJobById } from "@/lib/api";
import JobStatus from "@/components/JobActions";



export default async function JobDetailPage({
    params,
}: Readonly<{
    params: Promise<{ id: string }>;
}>) {

    const { id } = await params;

    const job = await getJobById(id);


    return (
        <main className="max-w-5xl mx-auto p-6 w-full">

            <Link
                href="/"
                className="inline-block mb-6 hover:underline"
            >
                &lt; Back To Home
            </Link>

            <div className="border border-gray-300 bg-white max-w-3xl mx-auto">

                <div className="p-8">

                    <div className="flex items-start justify-between mb-10">

                        <div>

                            <h1 className="text-3xl font-semibold mb-1">
                                {job.title}
                            </h1>

                            <p className="text-gray-500">
                                {job.location}
                            </p>

                        </div>

                        <p className="border border-gray-300 px-3 py-2 text-sm">
                            {job.status}
                        </p>

                    </div>

                    <div className="mb-24">

                        <h2 className="text-2xl font-medium mb-4">
                            Description
                        </h2>

                        <p className="text-gray-700 leading-relaxed">
                            {job.description}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl font-medium mb-4">
                            Contact
                        </h3>

                        <p className="mb-3">
                            {job.contactName}
                        </p>

                        <p className="text-gray-700">
                            {job.contactEmail}
                        </p>

                    </div>

                </div>

                <div className="bg-gray-100 border-t border-gray-300 p-4">

                    <JobStatus jobId={job._id} currentStatus={job.status}/>

                    

                </div>

            </div>

        </main>
    );
}