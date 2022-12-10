const SpotifyWebApi = require("spotify-web-api-node");
// import pool from "../db";
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Track from '../models/tracks.model';
// const gettoken = require('../utils/client-credentials')


const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function getPlaylistTracks() { 
  const tracksRepository = AppDataSource.getRepository(Track);
  const allTracks = await tracksRepository.find();
  return allTracks;
  // return new Promise((resolve, reject) =>
  //   pool.query(
  //     "SELECT * FROM playlist_tracks ORDER BY track_name ASC",
  //     (error: any, results: { rows: any }) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       return resolve(results.rows);
  //     }
  //   )
  // );
}

async function insertPlaylistTracks() {
  const fetch_tracks = await spotifyApi.getPlaylistTracks("37i9dQZF1DWXe9gFZP0gtP", {
    offset: 2,
    limit: 100,
  });

  const items = fetch_tracks.body.items;
  await Promise.all(items.map( (element: { track: any}) => {
    let track = new Track()
    let categoryRepository = AppDataSource.getRepository(Track);
    const track_info = element.track;
    track.id = track_info.id;
    track.track_name = track_info.name;
    track.artist = track_info.artists[0].name
    categoryRepository.save(track);
    console.log(track)
  }));
}

//   let id: any;
//   let name: any;
//   let artist: any;

//   return new Promise((resolve, reject) => {
//     for (let tracks_obj of tracks.body.items) {
//       const track = tracks_obj.track;
//       id = track.id;
//       name = track.name;
//       artist = track.artists[0].name;

//       pool.query(
//         'INSERT INTO playlist_tracks ("id", "track_name", "artist") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
//         [id, name, artist],
//         (error: any, results: { rows: any }) => {
//           if (error) {
//             return reject(error);
//           } else {
//             return resolve(results.rows);
//           }
//         }
//       );
//     }
//   });
// }

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
