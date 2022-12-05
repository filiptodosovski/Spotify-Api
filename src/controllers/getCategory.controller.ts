import { Request, Response } from 'express';
const insertCategory = require('../db').insertCategory;

const SpotifyWebApi = require("spotify-web-api-node");

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getCategory (req: Request, res: Response) {
  const category = await spotifyApi.getCategories({
    offset: 1
  });

  let categories = []

  for(let category_obj of category.body.categories.items) {
    categories.push({id: category_obj.id, category_name: category_obj.name})
    insertCategory(category_obj.id, category_obj.name)
  }

  res.send(categories)
}



export default getCategory