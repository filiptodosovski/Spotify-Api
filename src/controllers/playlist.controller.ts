import { Request, Response } from "express";
import { BadRequest } from "../errorhandler/BadRequest";
const getPlaylistForCategory =
  require("../services/get-playlist-for-category.service").getPlaylistForCategory;
const getPlaylistById =
  require("../services/get-playlist-for-category.service").getPlaylistById;

const getPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await getPlaylistForCategory();
    return res.status(200).json(playlists);
  } catch (error) {
    return res.send(error);
  }
};

const getPlaylistWithTracksById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const playlist = await getPlaylistById(id);
    return res.status(200).json(
      playlist
    );
  } catch (error) {
    throw new BadRequest("Api Bad Request")
  }
};

module.exports = {
  getPlaylists,
  getPlaylistWithTracksById
};
