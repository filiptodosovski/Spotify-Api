const SpotifyWebApi = require("spotify-web-api-node");
import pool from "../db";
const { accessToken } = require('../../config') 
// const gettoken = require('../utils/client-credentials')


const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

function getPlaylistTracks() { 
  return new Promise((resolve, reject) =>
    pool.query(
      "SELECT * FROM playlist_tracks ORDER BY track_name ASC",
      (error: any, results: { rows: any }) => {
        if (error) {
          return reject(error);
        }
        return resolve(results.rows);
      }
    )
  );
}

async function insertPlaylistTracks() {
  const tracks = await spotifyApi.getPlaylistTracks("37i9dQZF1DWXe9gFZP0gtP", {
    offset: 2,
    limit: 100,
  });

  let id: any;
  let name: any;
  let artist: any;

  return new Promise((resolve, reject) => {
    for (let tracks_obj of tracks.body.items) {
      const track = tracks_obj.track;
      id = track.id;
      name = track.name;
      artist = track.artists[0].name;

      pool.query(
        'INSERT INTO playlist_tracks ("id", "track_name", "artist") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [id, name, artist],
        (error: any, results: { rows: any }) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(results.rows);
          }
        }
      );
    }
  });
}

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
