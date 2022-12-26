import { Entity, Column, PrimaryColumn, ManyToMany} from 'typeorm';
import Playlist from './playlists.model';

@Entity('tracks')
export default class Track  {
  
  @PrimaryColumn()
  id!: string

  @Column()
  track_name!: string

  @Column()
  artist!: string

  @ManyToMany(() => Playlist, (playlist) => playlist.track)
  playlist!: Playlist

}
