/* eslint-disable no-useless-escape */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Parent from '../models/Parent';

class ParentController {
  async store(req: Request, res: Response) {
    const { name, email, password, cpf, phone } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required').min(2).max(100),
      email: Yup.string().required('Email is required').email(),
      password: Yup.string().required('Password is required').min(8).max(16),
      phone: Yup.string().required('Phone is required').min(8).max(16),
      cpf: Yup.string()
        .required('cpf is required')
        .matches(
          /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          'Cpf is not in the right format',
        ),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }

    const ParentRepository = getRepository(Parent);

    const parentExists = await ParentRepository.findOne({ email });

    if (parentExists) {
      return res.status(400).json({ error: 'Parent already exists' });
    }
    const parent = ParentRepository.create({
      name,
      email,
      password,
      phone,
      cpf,
    });

    try {
      await ParentRepository.save(parent);

      return res.json({
        id: parent.id,
        email: parent.email,
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new ParentController();
