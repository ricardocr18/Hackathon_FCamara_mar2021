import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import ProductsList from './ProductsList';
import Student from './Student';

@Entity('List')
class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToOne(type => Student, student => student.list)
  @JoinColumn()
  student: Student;

  @OneToMany(type => ProductsList, productsList => productsList.list)
  productsList: ProductsList[];
}

export default List;
