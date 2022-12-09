const SpotifyWebApi = require("spotify-web-api-node");
import pool from '../db'
const { accessToken } = require('../../config') 

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

function getCategory() {
  return new Promise ((resolve, reject) => 
  pool.query(
    "SELECT * FROM spotify_categories ORDER BY category_name ASC",
    (error: any, results: { rows: any }) => {
      if (error) {
        return reject(error);
      }
        return resolve(results.rows);
    }
  ));
};

async function insertCategory() {
  const category = await spotifyApi.getCategories({
    offset: 1,
  });

  let id;
  let name;

  return new Promise ((resolve, reject) => {
  for (let category_obj of category.body.categories.items) {
    id = category_obj.id;
    name = category_obj.name;
    pool.query(
      'INSERT INTO "spotify_categories" ("id", "category_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [id, name],
      (error: any, results: { rows: any }) => {
        if (error) {
          return reject(error);
        }
          return resolve(results.rows)
      }
    );
  }
})
};

module.exports = {
  getCategory,
  insertCategory,
};
