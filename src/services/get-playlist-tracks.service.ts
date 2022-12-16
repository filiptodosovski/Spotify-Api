const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Track from '../models/tracks.model';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function getPlaylistTracks() { 
  const tracksRepository = AppDataSource.getRepository(Track);
  const allTracks = await tracksRepository.find();
  return allTracks;
}

module.exports = {
  getPlaylistTracks
};
