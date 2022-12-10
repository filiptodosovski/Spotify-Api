import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('playlists')
export default class Playlist {
  
  @PrimaryColumn()
  id!: string

  @Column()
  playlist_name!: string
}
