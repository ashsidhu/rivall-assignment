import { Router } from "express";
import schedulesApi from "./schedules";
import { sendResponse } from "../utils/router";

const api = Router();
api.use("/schedules", schedulesApi);
api.use(sendResponse);

export default api;
