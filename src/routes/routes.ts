import express from 'express';
import { authenticatedMiddleware } from '../middlewares/authenticated-route.middleware';
import { ambassadorRoutes } from './ambassador.route';
import { AuthRouter } from './auth.route';

const app = express()

app.use('/auth', authenticatedMiddleware, AuthRouter);
app.use('/users/ambassadors', authenticatedMiddleware, ambassadorRoutes);

export { app as routers };