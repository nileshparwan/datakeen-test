import Course from "../models/course.model.js";

/**
 * @desc All products
 * @route POST /api/products
 * @access  Public
 */
export const getCourses = async (req, res) => {
    try {
        const result = await Course.find(); 
        res.json(result);
      } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};