import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import mongoDB from './config/db.js';

// models
import './models/course.model.js'
import './models/testimonial.model.js'
import './models/user.model.js'

export default () => {
    dotEnv.config();
    const app = express();

    // CORS middleware
    app.use(cors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    }));

    // Body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Error Handling Middleware
    app.use((err, req, res, next) => {
        console.error(`Error: ${err.message}`);
        res.status(err.status || 500).json({
            success: false,
            message: err.message || "Server Error",
        });
    });

    // Initialize MongoDB
    mongoDB();

    return app;
};
