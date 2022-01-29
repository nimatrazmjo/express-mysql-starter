import express from 'express';
import { authenticatedMiddleware } from '../middlewares/authenticated-route.middleware';
import { userRoutes } from './user.route';
import { AuthRouter } from './auth.route';
import { orderRoutes } from './order.route';
import { productRoutes } from './product.route';

const app = express()

app.use('/auth', authenticatedMiddleware, AuthRouter);
app.use('/users', authenticatedMiddleware, userRoutes);
app.use('/users/products', productRoutes);
app.use('/orders', orderRoutes);


export { app as routers };