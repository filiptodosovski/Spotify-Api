import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");
import pool from "../db";

const token = process.env.ACCESS_TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

const getPlaylistTracks = (req: Request, res: Response) => {
  pool.query(
    "SELECT * FROM playlist_tracks ORDER BY track_name ASC",
    (error: any, results: { rows: any }) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const insertPlaylistTracks = async (req: Request, res: Response) => {
  const tracks = await spotifyApi.getPlaylistTracks('37i9dQZF1DXcBWIGoYBM5M', {
    offset: 2,
    limit: 100
  })

  let id;
  let name;
  let artist;

  for(let tracks_obj of tracks.body.items) {
    const track = tracks_obj.track
    id = track.id
    name = track.name
    artist = track.artists[0].name
    pool.query(
      'INSERT INTO "playlist_tracks" ("id", "track_name", "artist") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [id, name, artist],
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

// async function (req: Request, res: Response) {
//   const tracks = await spotifyApi.getPlaylistTracks('37i9dQZF1DXcBWIGoYBM5M', {
//     offset: 2,
//     limit: 100
//   })

//   let tracks_array = []

//    {
//     const track = tracks_obj.track
//     tracks_array.push({track_id: track.id, track_name: track.name, artist: track.artists[0].name})
//     insertTracks(track.id, track.name, track.artists[0].name)
//   }

//   res.send(tracks_array)
// }

module.exports = {
  getPlaylistTracks,
  insertPlaylistTracks,
};
