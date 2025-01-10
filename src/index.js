import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AppProvider from './hooks/context/AppSessionProvider';
import { ClerkProvider } from '@clerk/clerk-react';
import SignUpScreen from './screens/SignupScreen';
import SignInScreen from './screens/SignInScreen';
import 'swiper/css';
import ContactScreen from './screens/ContactScreen';
import CoursesScreen from './screens/CoursesScreen';
import TestimonialScreen from './screens/TestimonialScreen';
import ErrorScreen from './screens/ErrorScreen';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route
      path="/"
      index={true}
      element={<HomeScreen />}
    />

    <Route
      path="/contact-us"
      index={true}
      element={<ContactScreen />}
    />

    <Route
      path="/reviews"
      index={true}
      element={<TestimonialScreen />}
    />

    <Route
      path="/courses"
      index={true}
      element={<CoursesScreen />}
    />

    <Route
      path="/sign-up"
      index={true}
      element={<SignUpScreen />}
    />

    <Route
      path="/sign-in"
      index={true}
      element={<SignInScreen />}
    />

    <Route path='*' element={<ErrorScreen />} />
  </Route>
));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppProvider>
        <React.Suspense fallback={<>Loading</>}>
          <RouterProvider router={router} />
        </React.Suspense>
      </AppProvider>
    </ClerkProvider>
  </React.StrictMode>
);


reportWebVitals();
