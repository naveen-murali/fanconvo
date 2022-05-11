export interface ServerModel {
    _setUpConfigs: () => void;
    _connectDatabase: () => void;
    _initializeRoutes: (routes: any[]) => void;
    _initializeMiddleware: () => void;
    _initializeErrorMiddleware: () => void;
}