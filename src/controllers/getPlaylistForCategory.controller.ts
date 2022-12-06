import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");
import pool from "../db";

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

const getPlaylistForCategory = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM category_playlists ORDER BY playlist_name ASC",
    (error: any, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const insertPlaylistForCategory = async (req: Request, res: Response) => {
  const playlist = await spotifyApi.getPlaylistsForCategory('0JQ5DAqbMKFEC4WFtoNRpw', {
    offset: 0,
    limit: 10
  })

  let id;
  let name;

  for(let playlist_obj of playlist.body.playlists.items) {
    id = playlist_obj.id;
    name = playlist_obj.name;
    pool.query(
      'INSERT INTO "category_playlists" ("id", "playlist_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [id, name],
      (error: any, results: { rows: any }) => {
        if (error) {
          throw error;
        }
        // res.status(201).json({
        //   status: "added to database",
        // });
      }
    );
  }
};

module.exports = {
  getPlaylistForCategory,
  insertPlaylistForCategory,
};
