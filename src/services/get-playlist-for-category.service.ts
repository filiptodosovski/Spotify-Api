const SpotifyWebApi = require("spotify-web-api-node");
import pool from "../db";
const { accessToken } = require('../../config') 

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

function getPlaylistForCategory() {
  return new Promise((resolve, reject) =>
    pool.query(
      "SELECT * FROM category_playlists ORDER BY playlist_name ASC",
      (error: any, results: { rows: any }) => {
        if (error) {
          return reject(error);
        }
        return resolve(results.rows);
      }
    )
  );
}

async function insertPlaylistForCategory() {
  const playlist = await spotifyApi.getPlaylistsForCategory(
    "0JQ5DAqbMKFCuoRTxhYWow",
    {
      offset: 0,
      limit: 10,
    }
  );

  let id;
  let name;

  return new Promise((resolve, reject) => {
    for (let playlist_obj of playlist.body.playlists.items) {
      id = playlist_obj.id;
      name = playlist_obj.name;
      pool.query(
        'INSERT INTO "category_playlists" ("id", "playlist_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [id, name],
        (error: any, results: { rows: any }) => {
          if (error) {
            return reject(error);
          }
          return resolve(results.rows);
        }
      );
    }
  });
}

module.exports = {
  getPlaylistForCategory,
  insertPlaylistForCategory,
};
