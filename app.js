import { initializeExpressApp } from './setup/setup-express';
// import { initializeRoutes, initializeErrorRoutes } from './routes';
import setupStartServer from './setup/startServer';

const app = initializeExpressApp();
initializeExpressApp(app);
// initializeRoutes(app);
// initializeErrorRoutes(app);
setupStartServer(app);

export default app;
