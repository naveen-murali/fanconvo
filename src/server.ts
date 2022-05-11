import { Server } from './app';
import { AuthRoutes } from './Auth/auth.routes';

const app = new Server([AuthRoutes]);

app.listen();