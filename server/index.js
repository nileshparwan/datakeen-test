import init from './server.js';
import productsRoutes from './routes/products.routes.js';
import testimonialsRoutes from './routes/testimonials.routes.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 3001;

    // routes
    app.use('/api/products', productsRoutes);
    app.use('/api/testimonials', testimonialsRoutes);

    app.listen(PORT, () => console.log('Server running on port:', PORT));
};

start();