import express from 'express';
import { getProducts } from '../controllers/products.controller.js';

const router = express.Router();
router.route('/').get(getProducts)


export default router;