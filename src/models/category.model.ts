import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('category')
export default class Category  {
  
  @PrimaryColumn()
  id!: string

  @Column()
  category_name!: string
}
