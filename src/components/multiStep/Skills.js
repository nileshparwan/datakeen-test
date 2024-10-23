import { useFormContext } from "react-hook-form";

const Skills = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div>
                <label>Skill 1</label>
                <input {...register('skill1')} className={`w-full px-3 py-2 border ${errors.skill1 ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.skill1 && <p className="text-red-500">{errors.skill1.message}</p>}
            </div>
            <div>
                <label>Skill 2</label>
                <input {...register('skill2')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label>Skill 3</label>
                <input {...register('skill3')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label>Skill 4</label>
                <input {...register('skill4')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label>Skill 5</label>
                <input {...register('skill5')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label>Experience</label>
                <textarea {...register('experience')} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
            </div>
        </div>
    );
};


export default Skills;