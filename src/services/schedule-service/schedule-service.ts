import { Repository } from "typeorm";
import { AppDataSource } from "../../db";
import Category from "../../models/category.model";
import Playlist from "../../models/playlists.model";
import Track from "../../models/tracks.model";
import cron from 'node-cron'
import SpotifyPackage, { TSpotifyPackage } from "../../packages/spotify.package";

export class ScheduleService {
  private static instance: ScheduleService

  constructor(
    private readonly playlistRepository: Repository<Playlist> = AppDataSource.getRepository(Playlist),
    private readonly trackRepository: Repository<Track> = AppDataSource.getRepository(Track),
    private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category),
    private readonly spotifyPackage: TSpotifyPackage = SpotifyPackage
    ) {}

    public static getInstance() {
      if(!ScheduleService.instance) {
        ScheduleService.instance = new ScheduleService()
      }

      return ScheduleService.instance
    }

  private async syncPlaylistsAndTracks() {
    const allPlaylists = await this.playlistRepository.find();
  
    allPlaylists.forEach(async (element: any) => {
      const tracksFromApi = await this.spotifyPackage.getPlaylistTracks(element.id)
      const tracks = tracksFromApi && tracksFromApi.body.items.map((element: any) => {
        const track_info = element.track;
        const album_name = track_info.album.name;
        let image1;
        const image_info = track_info.album.images;
        image_info.forEach((album:any) => {
          image1 = album.url;
        })
        const track = this.trackRepository.create({
          id: track_info.id,
          track_name: track_info.name,
          artist: track_info.artists[0].name,
          image: image1,
          album: album_name
        })

        this.trackRepository.upsert(track, ['id']);

        return track;
      })
  
      const playlist = new Playlist()
      playlist.id = element.id;
      playlist.playlist_name = element.name
      // @ts-ignore
      playlist.track = tracks as Track[];
     
      this.playlistRepository.save(playlist)
    });
  }

  private async syncCategoriesAndPlaylists() {
    const fetch_category = await this.spotifyPackage.getCategories()
  
    fetch_category && fetch_category.body.categories.items.forEach(async (element: any) => {
      const playlistsFromApi: any = await this.spotifyPackage.getPlaylistsForCategory(element.id)
      const playlists = playlistsFromApi && playlistsFromApi.body.playlists.items.map((element: any) => {
        let image1;
        const images = element.images.forEach((image: any) => {
          image1 = image.url;
        })
        const playlist = this.playlistRepository.create({
          id: element.id,
          playlist_name: element.name,
          image: image1
        })
        this.playlistRepository.upsert(playlist, ['id']);

        return playlist

       
      })
  
      const category = new Category()
      category.id = element.id;
      category.category_name = element.name
      category.playlist = playlists as Playlist[];
     
      this.categoryRepository.save(category)
    });
  }

  private async runTasks() {
    await this.syncCategoriesAndPlaylists()
    await this.syncPlaylistsAndTracks()
  }

  runSchedule () {
    cron.schedule(" 0 22 * * 1-5", () => {
      console.log("Running the Cron!")
      this.runTasks()
    });
  }
}