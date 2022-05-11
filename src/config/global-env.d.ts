declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: string;
        MONGO_URI: string;
        HOST_URL: string;
    }
}