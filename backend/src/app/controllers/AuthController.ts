import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Parent from '../models/Parent';
import PaperStore from '../models/PaperStore';

class AuthController {
  async authenticateParent(req: Request, res: Response) {
    const { email, password } = req.body;

    const parentRepository = getRepository(Parent);

    const parent = await parentRepository.findOne({ email });

    if (!parent) {
      return res.sendStatus(401);
    }

    if (!(await bcrypt.compare(password, parent.password))) {
      return res.sendStatus(401);
    }

    const token = await jwt.sign(
      { id: parent.id, type: 'parent' },
      String(process.env.JWT_SECRET),
      { expiresIn: '7d' },
    );

    return res.json({
      email,
      name: parent.name,
      id: parent.id,
      token,
    });
  }

  async authenticatePaperStore(req: Request, res: Response) {
    const { email, password } = req.body;

    const paperStoreRepository = getRepository(PaperStore);

    const paperStore = await paperStoreRepository.findOne({ email });

    if (!paperStore) {
      return res.sendStatus(401);
    }

    if (!(await bcrypt.compare(password, paperStore.password))) {
      return res.sendStatus(401);
    }

    const token = await jwt.sign(
      { id: paperStore.id, type: 'paperStore' },
      String(process.env.JWT_SECRET),
      { expiresIn: '7d' },
    );

    return res.json({
      email,
      name: paperStore.name,
      id: paperStore.id,
      token,
    });
  }
}

export default new AuthController();
