import { Router } from "express";
import daysApi from "./days";

const api = new Router();

api.use("/:scheduleId/days", daysApi);

export default api;
