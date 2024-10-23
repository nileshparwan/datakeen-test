import { useFormContext } from "react-hook-form";

const PersonalInfo = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div>
                <label>First Name</label>
                <input {...register('firstName')} className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
                <label>Last Name</label>
                <input {...register('lastName')} className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
                <label>Age</label>
                <input type="number" {...register('age', { valueAsNumber: true })} className={`w-full px-3 py-2 border ${errors.age ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>
            <div>
                <label>Phone</label>
                <input {...register('phone')} className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div>
                <label>Address</label>
                <input {...register('address')} className={`w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>
        </div>
    );
};


export default PersonalInfo;