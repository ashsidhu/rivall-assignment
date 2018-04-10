import { Router } from "express";
import Promise from "bluebird";
import { NotFoundError, BadRequestError, ServerError } from "../../../errors";
import {
  showDays,
  updateGameDay,
  deleteDay,
  showGamesByDayId,
  getFullSchedule
} from "../../../models";
import { asyncMiddleware } from "../../../utils/router";

const api = new Router();

api.put(
  "/merge",
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
