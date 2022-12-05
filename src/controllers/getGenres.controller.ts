import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getCategory (req: Request, res: Response) {
  const category = await spotifyApi.getCategories({
    offset: 1
  });

  let categories = []

  for(let cat of category.body.categories.items) {
    categories.push({id: cat.id, category_name: cat.name})
  }

  res.send(categories)
}

export default getCategory