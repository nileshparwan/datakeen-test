import init from './server.js';
import userRoutes from './routes/users.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import testimonialsRoutes from './routes/testimonials.routes.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 3001;

    // routes
    app.use('/api/courses', coursesRoutes);
    app.use('/api/testimonials', testimonialsRoutes);
    app.use('/api/users', userRoutes);
    
    app.listen(PORT, () => {
        console.log('Server running on port:', PORT)
    });
};

start();