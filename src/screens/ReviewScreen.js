import React, { useEffect, useState } from 'react';
import Testimonial from '../components/Testimonial';
import { toast } from 'react-toastify';
import TestimonialForm from '../components/TestimonialForm';
import { useAuth } from '@clerk/clerk-react';

const ReviewScreen = () => {
  const {isSignedIn} = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allReviews, setAllReviews] = useState(false);

  const topTestimonials = testimonials.filter((product) => product.rating > 4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteTestimonial = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/testimonials/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }
      const data = await response.json();
      toast.success(data.message);
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const createTestimonial = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/testimonials", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error("Failed to create testimonial");
      }
      const result = await response.json();
      toast.success("Testimonial created successfully");
      setTestimonials(testimonials.concat(result));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Read trusted reviews from our customers
            </h2>

            <p className="mt-6 max-w-lg leading-relaxed text-gray-700">
              Our customers' reviews give you an honest and trusted insight into the quality of our products and services.
              From real-world experiences to expert opinions, you can trust our reviews to help guide your decisions.
            </p>
          </div>

          <button
            type='button'
            onClick={() => setAllReviews(prev => !prev)}
            className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-600 px-5 py-3 text-blue-600 transition hover:bg-rose-600 hover:text-white md:mt-0"
          >
            <span className="font-medium"> {allReviews ? 'Read less' : 'Read all'} reviews </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>logo</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {
            topTestimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                rating={testimonial.rating}
                title={testimonial.title}
                name={testimonial.name}
                description={testimonial.description}
              />
            ))
          }
        </div>

        {
          allReviews &&
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {
              testimonials.filter((testimonial) => testimonial.rating < 5).map((testimonial) => (
                <Testimonial
                  key={testimonial.id}
                  rating={testimonial.rating}
                  title={testimonial.title}
                  name={testimonial.name}
                  description={testimonial.description}
                  deleteTestimonial={isSignedIn ?? true}
                  onDelete={() => deleteTestimonial(testimonial.id)}
                />
              ))
            }
          </div>
        }

        {isSignedIn && (<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Share Your Experience with Us</h1>

            <p className="mt-4 text-gray-500">
              We’d love to hear about your journey with our services!
            </p>
          </div>

          <TestimonialForm createTestimonial={createTestimonial} />
        </div>)}
      </div>
    </section>
  );
};

export default ReviewScreen;
