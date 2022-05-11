import express, { Express, json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUiExpress from 'swagger-ui-express';
import { cleanEnv, port, str, url } from 'envalid';

import { ServerModel } from './common';
import { BASER_ENDPOINT, ModesModel } from './common';
import { setupSwagger, swaggerDocs, createConnection } from './config';
import { createError, errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';

export class Server implements ServerModel {
    private readonly _app: Express;

    constructor(routes: any[]) {
        this._setUpConfigs();

        this._app = express();

        this._connectDatabase();
        this._initializeMiddleware();
        this._initializeRoutes(routes);
        this._initializeErrorMiddleware();
    }


    _setUpConfigs = (): void => {
        dotenv.config();
        cleanEnv(process.env, {
            NODE_ENV: str(),
            MONGO_URI: url(),
            PORT: port(),
        });

        setupSwagger();
    };


    _connectDatabase = (): void => {
        createConnection(process.env.MONGO_URI);
    };


    _initializeMiddleware = (): void => {
        this.makeDevDependancy(morgan("dev"));

        this._app.use(cors({ methods: "*", origin: "*" }));
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));

        this._app.use("/api-docs/v1", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
    };


    _initializeRoutes = (routes: any[]) => {
        routes.forEach(Route => new Route());
        this._app.use(`${BASER_ENDPOINT}`, router);
    };


    _initializeErrorMiddleware = (): void => {
        this._app.use(createError);
        this._app.use(errorMiddleware);
    };


    public listen = (): void => {
        this._app.listen(process.env.PORT, () => {
            console.log(`==================================`);
            console.log(` ======= ENV: ${process.env.NODE_ENV} =======`);
            console.log(` App listening on the port ${process.env.PORT}`);
            console.log(`==================================`);
        });
    };


    private makeDevDependancy(middleware: any) {
        process.env.NODE_ENV === ModesModel.DEV && this._app.use(middleware);
    };
}