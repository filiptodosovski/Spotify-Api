const tracks = require('../controllers/tracks.controller')
const tracks_router = require('express').Router();

tracks_router.get("/", tracks.getTracks),
tracks_router.get("/fetch", tracks.insertTracks);

module.exports = tracks_router;