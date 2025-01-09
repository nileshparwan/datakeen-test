import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { preload } from 'swr';
import Courses from '../components/Courses';
import { fetcher } from '../lib/swr.utils';

preload("http://localhost:3001/api/courses", fetcher);

const CoursesScreen = () => {
  return (
    <section className="bg-white space-y-10 mb-20">
      <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Top Courses
      </h2>

      <ErrorBoundary fallback={<h2>Could not fetch products.</h2>}>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Courses />
        </Suspense>
      </ErrorBoundary>
    </section >
  );
};

export default CoursesScreen;


