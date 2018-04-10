import { Router } from "express";
import Promise from "bluebird";
import moment from "moment";
import Joi from "joi";
import { NotFoundError, BadRequestError, ServerError } from "../../../errors";
import {
  showDays,
  updateGameDay,
  deleteDay,
  getFullSchedule
} from "../../../models";
import { asyncMiddleware, validateParams } from "../../../utils/router";

const api = new Router();

const mergeSchema = Joi.object().keys({
  merge_from: Joi.number()
    .integer()
    .min(1)
    .required(),
  merge_to: Joi.number()
    .integer()
    .min(1)
    .required()
});

function determineMaxSimultaneousGames(games) {
  // extract all timestamps, start and end
  // maintain max counter = 0
  // sort all timestamps
  // loop over timestamps
    // check how many are in each interval
    // update max counter
}

api.put(
  "/merge",
  validateParams(mergeSchema),
  asyncMiddleware(async (req, res, next) => {
    const { merge_from, merge_to } = req.body;
    if (merge_from === merge_to) return next(new BadRequestError());
    const days = await showDays([merge_to, merge_from]);
    if (days.length < 2) return next(new NotFoundError());

    let toDate = days.filter(d => d.id === merge_to)[0].date;
    toDate = moment(toDate).format("MM-DD-YYYY");
    await updateGameDay(merge_from, merge_to, toDate);
    await deleteDay(merge_from);

    const scheduleId = days[0].schedule_id;
    const schedule = await getFullSchedule(scheduleId);
    res.payload = schedule;
    return next();
  })
);

export default api;
