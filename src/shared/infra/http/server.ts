import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';



import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';



(async () => {
    const app = express();
    app.use(rateLimiter);
    app.use(cors());
    app.use(express.json());
    app.use('/files', express.static(uploadConfig.uploadsFolder));

    app.use(errors());

    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        console.log(err);


        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    })
    app.use(await routes());
    app.listen(process.env.APP_API_PORT, () => {
        console.log('go!')
    });
})();