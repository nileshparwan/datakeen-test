import React from 'react';
import Rating from './Rating';

const Products = ({ image, rating, name, description, lazyload = true }) => {
    return (
        <a href="/" className="group block overflow-hidden rounded-xl border border-gray-200 shadow-md max-w-xs">
            <div className="relative w-full h-60">
                <img
                    src={image || "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="test"
                    className="h-full w-full object-fit rounded-t-xl"
                    loading={lazyload ? 'lazy' : 'eager'}
                />
            </div>

            <div className="p-4 flex flex-col justify-between h-full">
                <strong className="text-xl font-medium text-gray-900">{name}</strong>

                <div className="flex justify-center gap-0.5 text-green-500 mt-1">
                    {Array(rating || 1)
                        .fill(0)
                        .map((_, index) => (
                            <Rating key={Math.random()} /> // Changed to index instead of Math.random()
                        ))}
                </div>

                <p className="mt-2 text-sm text-gray-700 flex-1">{description}</p>

                <span
                    className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
                >
                    Learn More
                </span>
            </div>
        </a>

    );
};

export default Products;
