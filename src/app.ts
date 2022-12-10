import express from 'express';
import { AppDataSource } from './db';
const playlistRoute = require('./routes/playlist.routes')
const categoryRoute = require('./routes/category.routes')
const tracksRoute = require('./routes/tracks.routes')

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();

app.use('/playlists', playlistRoute)
app.use('/category', categoryRoute)
app.use('/tracks', tracksRoute)

app.use(express.json())


export default app