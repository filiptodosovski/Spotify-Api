import { Express, Router, Response, Request } from "express";
import getUserData from "./controllers/spotifyData.controller";
const category = require("./controllers/getCategory.controller");
const playlist = require("./controllers/getPlaylistForCategory.controller");
const tracks = require('./controllers/getPlaylistTracks.controller')

function routes(app: Express) {
  app.get("/user", getUserData),
  app.get("/categories", category.getCategory),
  app.get("/fetch-categories", category.insertCategory);
  app.get("/playlists", playlist.getPlaylistForCategory),
  app.get('/fetch-playlists', playlist.insertPlaylistForCategory),
  app.get("/tracks", tracks.getPlaylistTracks),
  app.get('/fetch-tracks', tracks.insertPlaylistTracks);
}

export default routes;
