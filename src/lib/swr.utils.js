import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

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
    const { data, error, isLoading, isValidating } = useSWR(newUrl, fetcher, { suspense: true });
    return { data, error, isLoading, isValidating };
}

// TESTIMONIALS

export const createTestimonial = async (previousData, newData) => {
    try {
        console.log({ ...newData, new: true });
        mutate(
            API_TESTIMONIAL_URL,
            (existingData) => [...existingData, { ...newData, new: true }],
            {
                optimisticData: [...previousData, { ...newData, new: true }],
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
        // revalidate the data
        mutate(API_TESTIMONIAL_URL);
        return result;
    } catch (error) {
        console.error('Error creating resource:', error);
        throw error;
    }
};


export const deleteTestimonial = async (previousData, id) => {
    try {
        mutate(
            API_TESTIMONIAL_URL,
            (existingData) => [...(existingData.filter(exist => exist.id !== id))],
            {
                optimisticData: [...(previousData.filter(exist => exist.id !== id))],
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
        return result;

    } catch (error) {
        console.error('Error deleting resource:', error);
        throw error;
    }
};
