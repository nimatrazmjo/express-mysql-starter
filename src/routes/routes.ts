import express from 'express';
import { AuthRouter } from './auth.route';

const app = express()

app.use('/auth', AuthRouter)

export { app as routers };