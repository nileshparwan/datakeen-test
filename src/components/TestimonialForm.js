import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema } from "../lib/zod/schema";


const TestimonialForm = ({saveTestimonial}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(testimonialSchema),
    });

    const onSubmit = async (data) => {
        await saveTestimonial(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <div className="relative">
                    <input
                        type="text"
                        {...register("name")}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter name"
                    />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="course" className="sr-only">Course</label>
                <div className="relative">
                    <input
                        type="text"
                        {...register("course")}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter course"
                    />
                </div>
                {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
            </div>

            <div>
                <label htmlFor="rating" className="sr-only">Rating</label>
                <div className="relative">
                    <input
                        type="number"
                        {...register("rating", { valueAsNumber: true })}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Rating (1-5)"
                    />
                </div>
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div>

            <div>
                <label htmlFor="comments" className="sr-only">Comments</label>
                <div className="relative">
                    <textarea
                        {...register("comments")}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter Comments (Optional)"
                    />
                </div>
                {errors.comments && <p className="text-red-500 text-sm">{errors.comments.message}</p>}
            </div>

            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TestimonialForm;
