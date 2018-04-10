import { Router } from "express";
import Promise from "bluebird";
import Joi from "joi";
import { NotFoundError, BadRequestError, ServerError } from "../../../errors";
import {
  showDays,
  updateGameDay,
  deleteDay,
  showGamesByDayId,
  getFullSchedule
} from "../../../models";
import { asyncMiddleware, validateParams } from "../../../utils/router";

const api = new Router();

const mergeSchema = Joi.object().keys({
  merge_from: Joi.number().integer().min(1).required(),
  merge_to: Joi.number().integer().min(1).required(),
});

api.put(
  "/merge",
  validateParams(mergeSchema),
  asyncMiddleware(async (req, res, next) => {
    const { merge_from, merge_to } = req.body;
    if (merge_from === merge_to) return next(new BadRequestError());
    const days = await showDays([merge_to, merge_from]);
    if (days.length < 2) return next(new NotFoundError());

    await updateGameDay(merge_from, merge_to);
    await deleteDay(merge_from);

    const scheduleId = days[0].schedule_id;
    const schedule = await getFullSchedule(scheduleId);
    res.payload = schedule;
    return next();
  })
);

export default api;
