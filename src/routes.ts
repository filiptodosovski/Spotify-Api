import {Express, Response, Request} from 'express';
import getUserData from './controllers/spotifyData.controller';
import getCategory from './controllers/getCategory.controller'
import getPlaylistsForCategory from './controllers/getPlaylistForCategory.controller';
import getPlaylistTracks from './controllers/getPlaylistTracks.controller'


function routes (app: Express) {
  app.get('/user', getUserData),
  app.get('/category', getCategory),
  app.get('/playlists', getPlaylistsForCategory),
  app.get('/tracks', getPlaylistTracks)
}


export default routes;
