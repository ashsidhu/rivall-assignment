import { validate } from "joi";
import { BadRequestError } from "../errors";

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const sendResponse = (req, res, next) => {
  const { payload } = res;
  if (payload === undefined) return next();
  return res.status(200).json({
    data: payload
  });
};

export const validateParams = schema => (req, res, next) => {
  const params = { ...req.body };
  const result = validate(params, schema);
  if (result.error === null) return next();
  return next(new BadRequestError());
};
