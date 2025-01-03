// Import dependencies
import useSWR, { mutate } from 'swr';

// Fetch-based fetcher for SWR
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Base URL for API
const API_BASE_URL = 'https://api.example.com/resources';

// READ: Fetch resources with optional query strings
export function useResources(params) {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : '';

  const { data, error, isLoading, isValidating } = useSWR(
    `${API_BASE_URL}${queryString}`,
    fetcher,
    { suspense: true }
  );

  return {
    resources: data,
    isLoading: !error && !data,
    isValidating,
    isError: error,
  };
}

// CREATE: Add a new resource
export async function createResource(newResource) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResource),
    });

    if (!response.ok) {
      throw new Error('Failed to create resource');
    }

    const data = await response.json();
    // Optimistically update the cache
    mutate(API_BASE_URL, (existingData) => [...(existingData || []), data], false);
    return data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
}

// UPDATE: Update a resource by ID
export async function updateResource(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update resource');
    }

    const data = await response.json();
    // Update the cache
    mutate(
      API_BASE_URL,
      (existingData) =>
        existingData.map((resource) =>
          resource.id === id ? { ...resource, ...updatedData } : resource
        ),
      false
    );
    return data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
}

// DELETE: Remove a resource by ID
export async function deleteResource(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete resource');
    }

    // Update the cache
    mutate(
      API_BASE_URL,
      (existingData) => existingData.filter((resource) => resource.id !== id),
      false
    );
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
}

// Example usage in a component
import React, { useState, Suspense } from 'react';

export default function ResourceComponent() {
  const { resources, isValidating } = useResources({ search: 'example' });
  const [newResource, setNewResource] = useState('');

  const handleCreate = async () => {
    await createResource({ name: newResource });
    setNewResource('');
  };

  const handleUpdate = async (id) => {
    await updateResource(id, { name: 'Updated Resource' });
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <h1>Resources {isValidating && '(Refreshing...)'}</h1>
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>
              {resource.name}
              <button onClick={() => handleUpdate(resource.id)}>Update</button>
              <button onClick={() => handleDelete(resource.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newResource}
          onChange={(e) => setNewResource(e.target.value)}
          placeholder="New resource name"
        />
        <button onClick={handleCreate}>Add Resource</button>
      </div>
    </Suspense>
  );
}
