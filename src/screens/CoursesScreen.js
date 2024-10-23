import React, { useEffect, useState } from 'react';
import Products from '../components/Products';

const CoursesScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const topProducts = products.filter((product) => product.rating > 4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section class="bg-white space-y-10 mb-20">
      <h2 class="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Top Courses
      </h2>

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

      <h2 class="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
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

    </section >
  );
};

export default CoursesScreen;


