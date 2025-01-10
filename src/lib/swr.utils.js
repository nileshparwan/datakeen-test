import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { optional } from 'zod';

export const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
    return res.json();
};

export const API_BASE_URL = 'http://localhost:3001/api';
export const API_TESTIMONIAL_URL = 'http://localhost:3001/api/testimonials/';

export function useSwr({ url, params }) {
    const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : '';
    const newUrl = `${url}${queryString}`;
    const { data, error, isLoading, isValidating } = useSWR(newUrl, fetcher, {
        suspense: true
    });
    return { data, error, isLoading, isValidating };
}

// TESTIMONIALS

export const createTestimonial = async (previousData, newData) => {
    try {
        mutate(
            API_TESTIMONIAL_URL,
            (existingData) => [...existingData, {
                title: newData.course,
                rating: newData.rating,
                name: newData.name,
                description: newData.comments,
                new: true
            }],
            {
                optimisticData: [
                    ...previousData,
                    {
                        title: newData.course,
                        rating: newData.rating,
                        name: newData.name,
                        description: newData.comments,
                        new: true
                    }
                ],
                rollbackOnError: true,
                populateCache: true,
                revalidate: false
            }
        );

        const response = await fetch(API_TESTIMONIAL_URL, {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Failed to create testimonial");
        }
        const result = await response.json();
        toast.success("Testimonial created successfully");
        setTimeout(() => {
            mutate(API_TESTIMONIAL_URL);
        }, 3000);
        return result;
    } catch (error) {
        console.error('Error creating resource:', error);
        toast.error("Testimonial created successfully");
    }
};

export const updateTestimonial = async (previousData, newData, id) => {
    try {
        mutate(
            API_TESTIMONIAL_URL,
            (existingData) => existingData.map(exist => exist._id === id ? {
                title: newData.course,
                rating: newData.rating,
                name: newData.name,
                description: newData.comments,
                new: true
            } : exist),
            {
                optimisticData: previousData.map(exist => exist._id === id ? {
                    title: newData.course,
                    rating: newData.rating,
                    name: newData.name,
                    description: newData.comments,
                    new: true
                } : exist),
                rollbackOnError: true,
                populateCache: true,
                revalidate: false,
            }
        );

        const reponse = await fetch(`${API_TESTIMONIAL_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData)
        });
        
        if (!reponse.ok) {
            throw new Error("Failed to create testimonial");
        }
        
        const result = await reponse.json();
        toast.success(result.message);
        setTimeout(() => {
            mutate(API_TESTIMONIAL_URL);
        }, 3000);
    } catch (error) {
        console.error('Error updating resource:', error);
        toast.error("Error updating testimonial");
    }
};


export const deleteTestimonial = async (previousData, id) => {
    console.log(previousData.filter(exist => exist._id !== id));
    try {
        mutate(
            API_TESTIMONIAL_URL,
            (existingData) => [...(existingData.filter(exist => exist._id !== id))],
            {
                optimisticData: [...(previousData.filter(exist => exist._id !== id))],
                rollbackOnError: true,
                populateCache: true,
                revalidate: false
            }
        );

        const response = await fetch(`${API_TESTIMONIAL_URL}${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Failed to delete testimonial");
        }

        const result = await response.json();
        toast.success("Testimonial deleted successfully");
        setTimeout(() => {
            mutate(API_TESTIMONIAL_URL);
        }, 3000);
        return result;

    } catch (error) {
        console.error('Error deleting resource:', error);
        throw error;
    }
};
