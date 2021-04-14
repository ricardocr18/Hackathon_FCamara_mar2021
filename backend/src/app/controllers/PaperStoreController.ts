import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import PaperStore from '../models/PaperStore';

class PaperStoreController {
  async index(req: Request, res: Response) {
    const { neighborhood } = req.query;
    const PaperStoreRepository = getRepository(PaperStore);

    try {
      const stores = await PaperStoreRepository.find({
        select: [
          'id',
          'name',
          'description',
          'street',
          'neighborhood',
          'state',
          'city',
        ],
        where: {
          neighborhood,
        },
      });
      return res.json(stores);
    } catch (e) {
      return res.status(400).json({ error: 'Paper Stores not found.' });
    }
  }

  async store(req: Request, res: Response) {
    const {
      name,
      description,
      email,
      password,
      street,
      neighborhood,
      city,
      state,
    } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required').min(2).max(120),
      description: Yup.string()
        .required('description is required')
        .min(2)
        .max(280),
      email: Yup.string().required('Email is required').email(),
      password: Yup.string().required('Password is required').min(8).max(16),
      street: Yup.string().required('street is required').min(2).max(140),
      neighborhood: Yup.string()
        .required('neighborhood is required')
        .min(2)
        .max(140),
      city: Yup.string().required('city is required').min(2).max(140),
      state: Yup.string().required('state is required').min(2).max(140),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }

    const PaperStoreRepository = getRepository(PaperStore);

    const paperStoreExists = await PaperStoreRepository.findOne({ email });

    if (paperStoreExists) {
      return res.status(400).json({ error: 'PaperStore already exists' });
    }

    const paperStore = PaperStoreRepository.create({
      name,
      description,
      email,
      password,
      street,
      neighborhood,
      city,
      state,
    });

    try {
      await PaperStoreRepository.save(paperStore);

      return res.json({
        id: paperStore.id,
        email: paperStore.email,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'PaperStore could not be created, try again later' });
    }
  }

  async getMoney(req: Request, res: Response) {
    const { value } = req.body;
    const { storeId } = req;

    const schema = Yup.object().shape({
      value: Yup.number().required('value is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }

    const PaperStoreRepository = getRepository(PaperStore);

    const paperStore = await PaperStoreRepository.findOne(storeId);

    if (!paperStore) {
      return res.status(400).json({ error: 'PaperStore does not exists' });
    }

    const balance = paperStore.balance - value;

    if (balance < 0) {
      return res.status(400).json({ error: 'PaperStore could not get money' });
    }
    try {
      await PaperStoreRepository.update({ id: storeId }, { balance });
    } catch (e) {
      return res.status(400).json({ error: 'PaperStore could not get money' });
    }

    return res.json({
      id: paperStore.id,
      name: paperStore.name,
      email: paperStore.email,
    });
  }

  async info(req: Request, res: Response) {
    const { storeId } = req;
    const PaperStoreRepository = getRepository(PaperStore);

    try {
      const store = await PaperStoreRepository.findOne(storeId);
      return res.json(store);
    } catch (e) {
      return res.status(400).json({ error: 'Store not found.' });
    }
  }
}

export default new PaperStoreController();
