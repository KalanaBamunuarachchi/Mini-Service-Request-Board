"use client";
import Link from "next/link";
import { useState } from "react";
import { createJob } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewJobPage() {

    const router = useRouter();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Plumbing",
        location: "Colombo",
        contactName: "",
        contactEmail: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        contactEmail: "",
    });

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            title: "",
            description: "",
            contactEmail: "",
        };

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (
            formData.contactEmail &&
            !/\S+@\S+\.\S+/.test(formData.contactEmail)
        ) {
            newErrors.contactEmail = "Invalid email format";
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(
            (error) => error !== ""
        );

        if (hasErrors) return;

        try {

            setError("");

            await createJob(formData);

            router.push("/");

        } catch (error) {

            console.error(error);

            setError("Failed to create job");

        }
    };

    return (
        <main className="max-w-5xl mx-auto p-6 w-full">

            <Link
                href="/"
                className="inline-block mb-6 hover:underline"
            >
                &lt; Back To Home
            </Link>

            <div className="border border-gray-300 bg-white p-8 max-w-3xl">

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>

                        <label htmlFor="title" className="block mb-2 font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2"
                        />
                        {errors.title && (<p className="text-red-500 text-sm mt-1">{errors.title}</p>)}

                    </div>

                    <div>

                        <label htmlFor="description" className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            rows={6}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 resize-none"
                        />
                        {errors.description && (<p className="text-red-500 text-sm mt-1">{errors.description}</p>)}

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label htmlFor="category" className="block mb-2 font-medium">
                                Category
                            </label>

                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2">

                                <option>Plumbing</option>
                                <option>Electrical</option>
                                <option>Painting</option>

                            </select>

                        </div>

                        <div>

                            <label htmlFor="loation" className="block mb-2 font-medium">
                                Location
                            </label>

                            <select name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2">

                                <option>Colombo</option>
                                <option>Kandy</option>
                                <option>Galle</option>

                            </select>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label htmlFor="name" className="block mb-2 font-medium">
                                Contact Name
                            </label>

                            <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2" />

                        </div>

                        <div>

                            <label htmlFor="email" className="block mb-2 font-medium">
                                Contact Email
                            </label>

                            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2" />
                            {errors.contactEmail && (<p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>)}

                        </div>

                    </div>

                    <button className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition-colors">
                        Create Job
                    </button>

                    {error && (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )}

                </form>

            </div>

        </main>
    );
}