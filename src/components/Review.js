import React from 'react';
import { API_TESTIMONIAL_URL, createTestimonial, deleteTestimonial, useSwr } from '../lib/swr.utils';
import { useAuth } from '@clerk/clerk-react';
import Testimonial from './Testimonial';
import TestimonialForm from './TestimonialForm';

const Review = ({ allReviews }) => {
    const { isSignedIn } = useAuth();
    const { data, error, isLoading, isValidating } = useSwr({ url: API_TESTIMONIAL_URL });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const deleteHandler = async (id) => {
        await deleteTestimonial(data, id);
    };

    const createHandler = async (newData) => {
        await createTestimonial(data, newData);
    };

    return (
        <>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 relative">
                {
                    Array.isArray(data) && data
                        .filter((product) => product.rating > 4)
                        .map((testimonial) => (
                            <Testimonial
                                key={testimonial._id}
                                rating={testimonial.rating}
                                title={testimonial.title}
                                name={testimonial.name}
                                description={testimonial.description}
                            />
                        ))
                }


                {
                    allReviews && (
                        Array.isArray(data) && data
                            .filter((testimonial) => testimonial.rating < 5)
                            .map((testimonial) => (
                                <Testimonial
                                    key={testimonial._id}
                                    rating={testimonial.rating}
                                    title={testimonial.title}
                                    name={testimonial.name}
                                    description={testimonial.description}
                                    deleteTestimonial={isSignedIn ?? true}
                                    onDelete={() => deleteHandler(testimonial._id)}
                                    isValidating={testimonial.new}
                                />
                            ))
                    )
                }

                {
                    isValidating && <div className='fixed right-0 bottom-0 bg-gray-400 mr-5 mb-5'>
                        <p className='text-2xl text-gray-500 p-5 text-white'>Refreshing...</p>
                    </div>
                }
            </div>

            {isSignedIn && (<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Share Your Experience with Us</h1>

                    <p className="mt-4 text-gray-500">
                        We’d love to hear about your journey with our services!
                    </p>
                </div>

                <TestimonialForm saveTestimonial={createHandler} />
            </div>)}
        </>
    );
};

export default Review;
