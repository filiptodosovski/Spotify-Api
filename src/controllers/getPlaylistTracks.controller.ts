import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");
const insertTracks = require('../db').insertTracks;

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getPlaylistTracks(req: Request, res: Response) {
  const tracks = await spotifyApi.getPlaylistTracks('37i9dQZF1DXcBWIGoYBM5M', {
    offset: 2,
    limit: 100
  })

  let tracks_array = []

  for(let tracks_obj of tracks.body.items) {
    const track = tracks_obj.track
    tracks_array.push({track_id: track.id, track_name: track.name, artist: track.artists[0].name})
    insertTracks(track.id, track.name, track.artists[0].name)
  }

  res.send(tracks_array)
}

export default getPlaylistTracks