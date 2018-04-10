import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { NotFoundError, BadRequestError, ServerError } from "./errors";
import api from "./api";

const app = express();

// app configuration
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(), (err, req, res, next) => {
  if (err.statusCode === 400) return next(new BadRequestError)
});

// api routes go here
app.use("/", api);

// catch all routes
app.use((req, res, next) => {
  next(new NotFoundError());
});

// error handling middleware
app.use((err, req, res, next) => {
  // log original error message
  console.log(err.message);
  // hide server errors
  const message =
    !err.code || !err.message || err.code === 500
      ? "Internal Server Error"
      : err.message;
  return res
    .status(err.code || 500)
    .json({ message });
});

export default app;
