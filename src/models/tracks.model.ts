import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tracks')
export default class Track  {
  
  @PrimaryColumn()
  id!: string

  @Column()
  track_name!: string

  @Column()
  artist!: string
}
