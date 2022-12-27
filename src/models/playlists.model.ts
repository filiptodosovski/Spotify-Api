import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Category from './category.model';
import Track from './tracks.model';

@Entity('playlists')
export default class Playlist {
  
  @PrimaryColumn()
  id!: string

  @Column()
  playlist_name!: string

  @Column()
  image!: string

  @ManyToOne(() => Category, (category) => category.playlist)
  category!: Category;

  @ManyToMany(() => Track, (track) => track.playlist, {
    nullable: true,
    onUpdate: "NO ACTION"
  })
  @JoinTable()
  track!: Track[]
}
