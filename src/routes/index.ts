import { Router } from "express";
import { RequestHandler } from "express";
import asyncHandler from 'express-async-handler';

export const router: Router = Router();

export const Post = function (path: string, middleware?: RequestHandler | RequestHandler[]) {
    return (
        _target: Object,
        _propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        
        if (middleware)
            router
                .post(path, middleware, asyncHandler(descriptor.value));
        else
            router
                .post(path, asyncHandler(descriptor.value));
    };
};