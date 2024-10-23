import { products } from "../data/products.js";

/**
 * @desc All products
 * @route POST /api/products
 * @access  Public
 */
export const getProducts = (req, res) => {
    try {
        const result = products; 
        res.json(result);
      } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};