import React from 'react';
import Rating from './Rating';

const Testimonial = ({
    rating,
    title,
    name,
    description,
    deleteTestimonial = false,
    onDelete,
    isValidating
}) => {
    return (
        <div className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
            <div>
                <div className="flex gap-0.5 text-green-500 justify-between">
                    <div className='flex'>
                        {Array(Number.parseInt(rating, 10))
                            .fill(0)
                            .map((_, index) => (
                                <Rating key={Math.random()} />
                            ))}
                    </div>
                    <div className={`text-center ${isValidating ? 'animate-pulse' : 'hidden'}`}>Is validating</div>
                    {!isValidating && deleteTestimonial && (<button type='button' onClick={onDelete}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>logo</title>
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                                <path d="M10 11V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 11V17" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 7H20" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>)}
                </div>

                <div className="mt-4">
                    <p className="text-2xl font-bold text-blue-500 sm:text-3xl">{title}</p>

                    <p className="mt-4 leading-relaxed text-gray-700">
                        {description}
                    </p>
                </div>
            </div>

            <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                &mdash; {name}
            </footer>
        </div>
    );
};

export default Testimonial;
