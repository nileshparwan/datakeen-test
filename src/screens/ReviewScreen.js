import React, { Suspense, useState } from 'react';
import { API_TESTIMONIAL_URL, fetcher } from '../lib/swr.utils';
import Review from '../components/Review';
import { preload } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';

preload(API_TESTIMONIAL_URL, fetcher);

const ReviewScreen = () => {
  const [allReviews, setAllReviews] = useState(false);

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

        <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Review allReviews={allReviews} />
          </Suspense>
        </ErrorBoundary>

      </div>
    </section>
  );
};

export default ReviewScreen;
