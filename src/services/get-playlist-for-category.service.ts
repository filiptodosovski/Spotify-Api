const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Playlist from '../models/playlists.model';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function getPlaylistForCategory() {
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const allPlaylists = await playlistRepository.find();
  return allPlaylists;
  // return new Promise((resolve, reject) =>
  //   pool.query(
  //     "SELECT * FROM category_playlists ORDER BY playlist_name ASC",
  //     (error: any, results: { rows: any }) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(results.rows);
  //     }
  //   )
  // );
}

async function insertPlaylistForCategory() {
  const fetch_playlist = await spotifyApi.getPlaylistsForCategory(
    "0JQ5DAqbMKFCuoRTxhYWow",
    {
      offset: 0,
      limit: 20,
    }
  );

  const items = fetch_playlist.body.playlists.items;
  await Promise.all(items.map( (element: { id: string; name: string; }) => {
    let playlist = new Playlist()
    let categoryRepository = AppDataSource.getRepository(Playlist);
    playlist.id = element.id;
    playlist.playlist_name = element.name;
    categoryRepository.save(playlist);
    console.log(playlist)
  }));

  // let id;
  // let name;

  // return new Promise((resolve, reject) => {
  //   for (let playlist_obj of playlist.body.playlists.items) {
  //     id = playlist_obj.id;
  //     name = playlist_obj.name;
  //     pool.query(
  //       'INSERT INTO "category_playlists" ("id", "playlist_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
  //       [id, name],
  //       (error: any, results: { rows: any }) => {
  //         if (error) {
  //           return reject(error);
  //         }
  //         return resolve(results.rows);
  //       }
  //     );
  //   }
  // });
}

module.exports = {
  getPlaylistForCategory,
  insertPlaylistForCategory,
};
