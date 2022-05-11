import { Request, Response, NextFunction } from "express";
import { Error } from 'mongoose';
import httpError, { HttpError } from "http-errors";
import { MongoError } from 'mongodb';
import { HttpException } from '../exceptions';

export const createError = (_req: Request, _res: Response, next: NextFunction) => {
    next(httpError(404));
};

export const errorMiddleware = (err: HttpException | MongoError, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof Error.ValidationError)
        res.status(400)
            .json({
                message: "Bad request",
                error: Object.values(err.errors)
                    .map((err) => err.message)
            });

    else if ((err as MongoError).code === 11000)
        res.status(409)
            .json({
                message: "Conflict",
                error: ["Credentials are already in use"]
            });

    else if (err instanceof HttpException || err instanceof HttpError) {
        const status = err.status || 500;
        const message = err.message || "Something went wrong!";
        const errors = err.errors;

        res.status(status).json({ message, error: errors });
    }

    else {
        res.status((err as any).status || 500).json({ message: err.message, error: [err.message] });
    }
};