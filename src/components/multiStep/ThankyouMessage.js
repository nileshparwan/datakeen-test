import React from 'react';

const ThankyouMessage = () => {
    return (
        <section className="rounded-3xl w-[500px] mx-auto border border-gray-200 shadow-md">
            <div className="p-8 text-center sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                    Your personal details are on the way
                </p>

                <h2 className="mt-6 text-3xl font-bold">Thanks for submitting the form, we're getting it ready!</h2>

                <a
                    className="mt-8 inline-block w-full rounded-full bg-blue-600 py-4 text-sm font-bold text-white shadow-xl"
                    href="/contact-us"
                >
                    Go back
                </a>
            </div>
        </section>
    );
};

export default ThankyouMessage;
