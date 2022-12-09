import { Request, Response } from "express";
const getPlaylistForCategory =
  require("../services/get-playlist-for-category.service").getPlaylistForCategory;
const insertPlaylistForCategory =
  require("../services/get-playlist-for-category.service").insertPlaylistForCategory;

const getPlaylists = async (req: Request, res: Response) => {
  const tracks = await getPlaylistForCategory();
  return res.status(200).json(tracks);
};

const insertPlaylists = async (req: Request, res: Response) => {
  await insertPlaylistForCategory();
  return res.status(200).json({
    success: "added to database",
  });
};

module.exports = {
  getPlaylists,
  insertPlaylists,
};
