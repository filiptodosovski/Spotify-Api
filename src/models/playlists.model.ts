import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Category from './category.model';
import Track from './tracks.model';

@Entity('playlists')
export default class Playlist {
  
  @PrimaryColumn()
  id!: string

  @Column()
  playlist_name!: string

  @ManyToOne(() => Category, (category) => category.playlist)
  category!: string;

  @ManyToMany(() => Track, (track) => track.playlist)
  @JoinTable()
  track!: Track
}
