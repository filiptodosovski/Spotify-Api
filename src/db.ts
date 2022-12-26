import { DataSource } from 'typeorm';
import Category from './models/category.model'
import Playlist from './models/playlists.model';
import Track from './models/tracks.model';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1493",
  database: "spotify",
  synchronize: true,
  logging: false,
  entities: [Category, Playlist, Track]
})