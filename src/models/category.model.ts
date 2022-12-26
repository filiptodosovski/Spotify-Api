import { Entity, Column, PrimaryColumn, OneToMany, Unique } from 'typeorm';
import Playlist from './playlists.model';

@Entity('category')
@Unique(["id"])
export default class Category  {
  
  @PrimaryColumn()
  id!: string

  @Column()
  category_name!: string

  @OneToMany(() => Playlist, (playlist) => playlist.category)
  playlist!: Playlist[]
}
