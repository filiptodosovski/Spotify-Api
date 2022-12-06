import { NextFunction, Request, Response } from "express";
const SpotifyWebApi = require("spotify-web-api-node");
import pool from "../db";


const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

const getCategory = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM spotify_categories ORDER BY category_name ASC",
    (error: any, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const insertCategory = async (req: Request, res: Response) => {
  const category = await spotifyApi.getCategories({
    offset: 1,
  });

  let id;
  let name;

  for (let category_obj of category.body.categories.items) {
    id = category_obj.id;
    name = category_obj.name;
    pool.query(
      'INSERT INTO "spotify_categories" ("id", "category_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
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
  getCategory,
  insertCategory,
};
