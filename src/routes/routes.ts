import express from 'express';
import { authenticatedMiddleware } from '../middlewares/authenticated-route.middleware';
import { ambassadorRoutes } from './ambassador.route';
import { AuthRouter } from './auth.route';
import { productRoutes } from './product.route';

const app = express()

app.use('/auth', authenticatedMiddleware, AuthRouter);
app.use('/users/ambassadors', authenticatedMiddleware, ambassadorRoutes);
app.use('/users/products', productRoutes);

export { app as routers };