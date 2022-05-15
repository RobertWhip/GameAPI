import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({ name: 'publishers' })
class Publisher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('int')
  siret!: number;

  @Column('text')
  phone: string;
}

export default Publisher;