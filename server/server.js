import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';

export default () => {
    const app = express();
    dotEnv.config();
    const corsOptions = {
        AccessControlAllowOrigin: '*',
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    };
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        if (req.method === "OPTIONS") {
            return res.status(200).json({});
        }
        next();
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    return app;
};