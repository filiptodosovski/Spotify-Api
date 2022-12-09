import { Request, Response } from "express";
const getPlaylistTracks =
  require("../services/get-playlist-tracks.service").getPlaylistTracks;
const insertPlaylistTracks =
  require("../services/get-playlist-tracks.service").insertPlaylistTracks;

const getTracks = async (req: Request, res: Response) => {
  const tracks = await getPlaylistTracks();
  return res.status(200).json(tracks);
};

const insertTracks = async (req: Request, res: Response) => {
  await insertPlaylistTracks();
  return res.status(200).json({
    success: "added to database",
  });
};

module.exports = {
  getTracks,
  insertTracks,
};
