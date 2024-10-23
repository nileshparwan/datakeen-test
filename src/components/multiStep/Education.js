import { useFormContext } from "react-hook-form";

const Education = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div>
                <label>Degree</label>
                <input {...register('degree')} className={`w-full px-3 py-2 border ${errors.degree ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.degree && <p className="text-red-500">{errors.degree.message}</p>}
            </div>
            <div>
                <label>University</label>
                <input {...register('university')} className={`w-full px-3 py-2 border ${errors.university ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.university && <p className="text-red-500">{errors.university.message}</p>}
            </div>
            <div>
                <label>Graduation Year</label>
                <input type="number" {...register('graduationYear', { valueAsNumber: true })} className={`w-full px-3 py-2 border ${errors.graduationYear ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.graduationYear && <p className="text-red-500">{errors.graduationYear.message}</p>}
            </div>
            <div>
                <label>Major</label>
                <input {...register('major')} className={`w-full px-3 py-2 border ${errors.major ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.major && <p className="text-red-500">{errors.major.message}</p>}
            </div>
            <div>
                <label>GPA</label>
                <input type="number" {...register('gpa', {valueAsNumber: true})} className={`w-full px-3 py-2 border ${errors.gpa ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.gpa && <p className="text-red-500">{errors.gpa.message}</p>}
            </div>
            <div>
                <label>Certifications</label>
                <input {...register('certifications')} className="border p-2 w-full" />
            </div>
        </div>
    );
};

export default Education;