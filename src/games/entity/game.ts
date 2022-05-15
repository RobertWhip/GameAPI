import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({ name: 'games' })
class Publisher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('int')
  publisherId: number;

  @Column('int')
  price: number;

  @Column('array')
  tags: string[];

  @Column('date')
  releaseDate: string;
}

export default Publisher;