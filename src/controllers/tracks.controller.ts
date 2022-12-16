import { Request, Response } from "express";
import { BadRequest } from "../errorhandler/BadRequest";
const getPlaylistTracks =
  require("../services/get-playlist-tracks.service").getPlaylistTracks;


const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await getPlaylistTracks();
    return res.status(200).json(tracks);
  } catch (error) {
    throw new BadRequest("Api Bad Request")
  }
};


module.exports = {
  getTracks
};
