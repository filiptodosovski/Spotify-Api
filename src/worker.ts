import Category from "./models/category.model";
import Playlist from "./models/playlists.model";
import Track from "./models/tracks.model";

const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../config')
const { AppDataSource } = require('./db')

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function syncPlaylistsAndTracks() {
  const playlistRepository = AppDataSource.getRepository(Playlist);
  const allPlaylists = await playlistRepository.find();
  console.log(allPlaylists)

  allPlaylists.forEach(async (element: any) => {
    let tracks = await spotifyApi.getPlaylistTracks(element.id, {
      offset: 1,
      limit: 2
    });
    tracks = tracks.body.items.map((element: any) => {
      let track_info = element.track;
      const track = AppDataSource.getRepository(Track).create({
        id: track_info.id,
        track_name: track_info.name,
        artist: track_info.artists[0].name
      })
      return track;
      // let categoryRepository = AppDataSource.getRepository(Track);
      // const track = new Track()  
      // const track_info = element.track;
      // track.id = track_info.id;
      // track.track_name = track_info.name;
      // track.artist = track_info.artists[0].name
      // categoryRepository.save(track);
    })

    let playlistRepository = AppDataSource.getRepository(Playlist);

    const playlist = new Playlist()
    playlist.id = element.id;
    playlist.playlist_name = element.name
    playlist.track = tracks;
   
    playlistRepository.save(playlist)
  });

  // const fetch_tracks = await spotifyApi.getPlaylistTracks("37i9dQZF1DWXe9gFZP0gtP", {
  //   offset: 2,
  //   limit: 100,
  // });
}

async function syncCategoriesAndPlaylists() {
  const fetch_category = await spotifyApi.getCategories({
    offset: 0,
    limit: 3
  })

   fetch_category.body.categories.items.forEach(async (element: any) => {
    let playlists = await spotifyApi.getPlaylistsForCategory(element.id)
    playlists = playlists.body.playlists.items.map((element: any) => {
      
      const playlist = AppDataSource.getRepository(Playlist).create({
        id: element.id,
        playlist_name: element.name
      })
      return playlist
    })
    let categoryRepository = AppDataSource.getRepository(Category);

    const category = new Category()
    category.id = element.id;
    category.category_name = element.name
    category.playlist = playlists;
   
    categoryRepository.save(category)
  });
}


export async function runTasks() {
  await syncCategoriesAndPlaylists()
  await syncPlaylistsAndTracks()
  // await insertPlaylistForCategory();
  console.log("Done!")
}

