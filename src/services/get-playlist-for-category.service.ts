const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Playlist from '../models/playlists.model';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

const playlistRepository = AppDataSource.getRepository(Playlist);

async function getPlaylistForCategory() {
  const allPlaylists = await playlistRepository.find({
    relations: ["track"]
  });

  return allPlaylists;
}

async function getPlaylistById(id: string) {
  const allPlaylists = await playlistRepository.find({
    where: {
      id
    },
    relations: ["track"]
  });
  return allPlaylists;
}

module.exports = {
  getPlaylistForCategory,
  getPlaylistById
};
