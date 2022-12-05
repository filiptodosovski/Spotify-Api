import {Express, Response, Request} from 'express';
import getUserData from './controllers/spotifydata.controller';
import getCategory from './controllers/getGenres.controller'
import getPlaylistsForCategory from './controllers/getPlaylistForCategory';


function routes (app: Express) {
  app.get('/userdata', getUserData),
  app.get('/category', getCategory),
  app.get('/playlists', getPlaylistsForCategory)
}


export default routes;


// function getMyData() {
//   (async () => {
//     const me = await spotifyApi.getMe();
//     console.log(me.body);
//   })().catch((e) => {
//     console.error(e);
//   });
// }