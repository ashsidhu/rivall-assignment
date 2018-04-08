import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { NotFoundError, ServerError } from "./errors";
import db from './db';

const app = express();

// app configuration
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api routes go here

// catch all routes
app.use((req, res, next) => {
  next(new NotFoundError());
});

// error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ message: err.message || "Internal Server Error" });
});

export default app;
