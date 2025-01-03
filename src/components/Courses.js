import React from 'react';
import Products from './Products';
import { useSwr } from '../lib/swr.utils';

const Courses = () => {
    const { data: products, error, isLoading, isValidating } = useSwr({ url: "http://localhost:3001/api/products" });
    const topProducts = products.filter((product) => product.rating > 4);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
        <>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {
                    topProducts.map((product) => (
                        <li className='mx-auto' key={product.id}>
                            <Products
                                image={product.image}
                                rating={product.rating}
                                name={product.name}
                                description={product.description}
                                lazyload={false}
                            />
                        </li>
                    ))
                }
            </ul>

            <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                All Courses
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 space-y-5">
                {
                    products.map((product) => (
                        <li className='mx-auto' key={product.id}>
                            <Products
                                image={product.image}
                                rating={product.rating}
                                name={product.name}
                                description={product.description}
                                lazyload={true}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default Courses;
