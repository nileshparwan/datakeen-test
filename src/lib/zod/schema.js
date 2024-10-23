import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
  phone: z.string().min(8, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
});

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  university: z.string().min(1, 'University is required'),
  graduationYear: z.number().min(1900, 'Enter a valid year'),
  major: z.string().min(1, 'Major is required'),
  gpa: z.number().min(0).max(4),
  certifications: z.string().optional(),
});

export const skillsSchema = z.object({
  skill1: z.string().min(1, 'At least one skill is required'),
  skill2: z.string().optional(),
  skill3: z.string().optional(),
  skill4: z.string().optional(),
  skill5: z.string().optional(),
  experience: z.string().min(1, 'Experience description is required'),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  course: z.string().min(1, "Course is required"),
  rating: z.number().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
  comments: z.string().min(1, "Comments is required"),
});