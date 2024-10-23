import { testimonials } from "../data/testimonials.js";

/**
 * @desc All testimonials
 * @route get /api/testimonials
 * @access  Public
 */
export const getTestimonials = (req, res) => {
    try {
        const result = testimonials; 
        res.json(result);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

/**
 * @desc create testimonials
 * @route POST /api/testimonials
 * @access  Private
 */
export const createTestimonial = (req, res) => {
    try {
        const { rating, course, name, comments } = req.body;
        const newTestimonial = {
            id: testimonials.length + 1,
            rating,
            title: course,
            name,
            description: comments
        };
        testimonials.push(newTestimonial);
        res.status(201).json(newTestimonial);
    } catch (error) {
        console.error("Error creating testimonial: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc remove testimonial
 * @route POST /api/testimonials
 * @access  Private
 */
export const deleteTestimonial = (req, res) => {
    try {
        const { id } = req.params;
        const index = testimonials.findIndex(testimonial => testimonial.id === id);
        testimonials.splice(index, 1);
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error("Error deleting testimonial: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};