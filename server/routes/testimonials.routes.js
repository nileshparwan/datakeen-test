import express from 'express';
import { getTestimonials, createTestimonial, deleteTestimonial, updateTestimonial } from '../controllers/testimonials.controller.js';

const router = express.Router();

router.route('/')
    .get(getTestimonials)
    .post(createTestimonial)

router.route('/:id')
    .delete(deleteTestimonial)
    .put(updateTestimonial)

export default router;