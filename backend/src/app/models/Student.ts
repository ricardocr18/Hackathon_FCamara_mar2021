import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import List from './List';
import Parent from './Parent';
import School from './School';

@Entity('Student')
class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  studentRA: string;

  @Column()
  img_id: number;

  @ManyToOne(type => Parent, parent => parent.students)
  parent: Parent;

  @ManyToOne(type => School, school => school.students)
  school: School;

  @OneToOne(type => List, list => list.student)
  list: List;
}

export default Student;
