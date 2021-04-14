import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Parent from '../models/Parent';
import School from '../models/School';
import Student from '../models/Student';

class StudentController {
  async store(req: Request, res: Response) {
    const { name, birthDate, studentRA, schoolId, img_id } = req.body;
    const { parentId } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required').min(2).max(100),
      birthDate: Yup.date().required('Birthdate is required'),
      studentRA: Yup.string().required('studentRA is required').min(5).max(150),
      schoolId: Yup.number().integer().required('School Id is required'),
      img_id: Yup.number()
        .integer()
        .required('img Id is required')
        .min(1)
        .max(4),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }

    const StudentRepository = getRepository(Student);
    const ParentRepository = getRepository(Parent);
    const SchoolRepository = getRepository(School);

    const parent = await ParentRepository.findOne({ id: parentId });
    const school = await SchoolRepository.findOne({ id: schoolId });

    if (!parent) {
      return res.status(400).json({ error: 'Parent does not exist' });
    }

    if (!school) {
      return res.status(400).json({ error: 'School does not exist' });
    }

    const student = StudentRepository.create({
      name,
      birthDate,
      studentRA,
      parent,
      school,
      img_id,
    });

    try {
      await StudentRepository.save(student);

      return res.json({
        id: student.id,
        birthDate: student.birthDate,
        studentRa: student.studentRA,
        parent: {
          parentId: parent.id,
          parentName: parent.name,
        },
        school: {
          schoolId: school.id,
          schoolName: school.name,
        },
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Student could not be created, try again later' });
    }
  }

  async findByParent(req: Request, res: Response) {
    const { parentId } = req;

    const ParentRepository = getRepository(Parent);
    const StudentRepository = getRepository(Student);

    const parent = await ParentRepository.findOne(parentId);

    if (!parent) {
      return res.status(400).json({ error: 'Parent not found' });
    }

    const students = await StudentRepository.find({
      where: {
        parent,
      },
      relations: ['list'],
    });

    return res.json({
      students,
    });
  }
}

export default new StudentController();
