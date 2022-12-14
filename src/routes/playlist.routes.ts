const playlist = require("../controllers/playlist.controller");
const playlist_router = require('express').Router();

playlist_router.get("/", playlist.getPlaylists),
playlist_router.get('/fetch/:id', playlist.getPlaylistWithTracksById)

module.exports = playlist_router;
