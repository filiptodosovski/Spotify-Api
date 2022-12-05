import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getPlaylistsForCategory(req: Request, res: Response){
  const playlist = await spotifyApi.getPlaylistsForCategory('0JQ5DAqbMKFEC4WFtoNRpw', {
    offset: 0,
    limit: 10
  })

  let playlists = []

  for(let playlist_ex of playlist.body.playlists.items) {
    playlists.push({id: playlist_ex.id, playlist_name: playlist_ex.name})
  }

  res.send(playlists)
}

export default getPlaylistsForCategory
