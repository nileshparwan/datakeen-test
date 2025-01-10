import Testimonial from "../models/testimonial.model.js";

/**
 * @desc All testimonials
 * @route get /api/testimonials
 * @access  Public
 */
export const getTestimonials = async (req, res) => {
    try {
        const result = await Testimonial.find(); 
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
export const createTestimonial = async (req, res) => {
    try {
        const { rating, course, name, comments } = req.body;
        const newTestimonial = new Testimonial({
            rating,
            user: '677e678b0c7c5349aa67b974',
            title: course,
            name,
            description: comments
        });
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
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
export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const findTestimonial = await Testimonial.findById(id);
        if (findTestimonial) {
            await Testimonial.deleteOne({ _id: findTestimonial._id });
            res.status(200).json({ message: 'Testimonial deleted successfully' });
        }
    } catch (error) {
        console.error("Error deleting testimonial: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, course, name, comments } = req.body;
        const findTestimonial = await Testimonial.findById(id);
        
        if (!findTestimonial) {
            console.error(`Cannot find testimonial with id: ${id}`);
            throw new Error('Cannot find testimonial');
        }

        const result = await Testimonial.updateOne({ _id: findTestimonial._id.toString() }, { rating, title: course, name, description: comments });
        
        if(result.matchedCount === 0) {
            console.error(`Error updating testimonial with id: ${id}`);
            throw new Error(`Error updating testimonial with id: ${id}`);
        }

        res.status(200).json({ message: 'Testimonial updated successfully' });

    } catch (error) {
        console.error("Error updating testimonial: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}