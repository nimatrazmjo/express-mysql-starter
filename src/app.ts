import express, { json } from "express";
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors';
import cors from 'cors';

import { routers } from "./routes/routes";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import notFoundMiddleware from "./middlewares/not-found.middleware";
import cookieSession from "cookie-session";

const app = express();


// initial configuration
app.use(cors({}))
app.use(json());
app.use(cookieSession(
  {
    signed: false,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
));

// Routes
app.use('/api',routers);

//not found
app.all("*", notFoundMiddleware)

//error handler middleware
app.use(errorHandlerMiddleware);

export { app }
