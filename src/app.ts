import express from 'express';
const playlistRoute = require('./routes/playlist.routes')
const categoryRoute = require('./routes/category.routes')
const tracksRoute = require('./routes/tracks.routes')

const app = express();

app.use('/playlists', playlistRoute)
app.use('/category', categoryRoute)
app.use('/tracks', tracksRoute)

app.use(express.json())

export default app;