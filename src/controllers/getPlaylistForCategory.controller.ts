import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");
const insertPlaylistForCategory = require('../db').insertPlaylistForCategory;

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getPlaylistsForCategory(req: Request, res: Response){
  const playlist = await spotifyApi.getPlaylistsForCategory('0JQ5DAqbMKFEC4WFtoNRpw', {
    offset: 0,
    limit: 10
  })

  let playlists = []

  for(let playlist_obj of playlist.body.playlists.items) {
    playlists.push({id: playlist_obj.id, playlist_name: playlist_obj.name})
    insertPlaylistForCategory(playlist_obj.id, playlist_obj.name)
  }

  res.send(playlists)
}

export default getPlaylistsForCategory
