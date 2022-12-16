import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./db";
const playlistRoute = require("./routes/playlist.routes");
const categoryRoute = require("./routes/category.routes");
const tracksRoute = require("./routes/tracks.routes");
var cron = require("node-cron");
import {runTasks} from "./worker";
import {BaseError} from './errorhandler/baseError'
import { ScheduleService } from "./services/schedule-service/schedule-service";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Postgres!");
  })
  .catch((err) => {
    console.error("Error during connecting to Postgres:", err);
  });

const app = express();
ScheduleService.getInstance().runSchedule()

app.use("/playlists", playlistRoute);
app.use("/category", categoryRoute);
app.use("/tracks", tracksRoute);

app.use(
    (error: any, request: Request, response: Response, _: NextFunction) => {
      if (error instanceof BaseError) {
        return response.status(error.httpCode || 500).send(error.message)
      }
      // TODO: Implement logger and replace this
      console.log('Unknown error! Kill the application', error)
      process.exit(0)
    },
  )

app.use(express.json());

export default app;
