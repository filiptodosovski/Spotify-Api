import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");
require('dotenv').config();


const token = process.env.ACCESS_TOKEN;
  
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getUserData (req: Request, res: Response){
  const me = await spotifyApi.getMe();
  res.send(me.body)
}

export default getUserData;