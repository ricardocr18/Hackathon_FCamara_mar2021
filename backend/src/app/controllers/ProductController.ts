import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import PaperStore from '../models/PaperStore';
import Product from '../models/Product';

class ProductController {
  async store(req: Request, res: Response) {
    const { name, description, img_url, price } = req.body;
    const { storeId } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required').min(2).max(100),
      description: Yup.string().required('description is required'),
      img_url: Yup.string().required('img_url is required').min(5).max(300),
      price: Yup.number().required('price is required'),
    });

    try {
      await schema.validate(req.body);
    } catch (e) {
      return res.status(400).json(e);
    }

    const PaperStoreRepository = getRepository(PaperStore);
    const ProductRepository = getRepository(Product);

    const paperStore = await PaperStoreRepository.findOne({ id: storeId });

    if (!paperStore) {
      return res.status(400).json({ error: 'Paper Store does not exist' });
    }

    const product = ProductRepository.create({
      name,
      description,
      img_url,
      price,
      paperStore,
    });

    try {
      await ProductRepository.save(product);

      return res.json({
        product,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Product could not be created, try again later' });
    }
  }

  async findByPaperStore(req: Request, res: Response) {
    const { id } = req.params;
    const ProductRepository = getRepository(Product);
    const PaperStoreRepository = getRepository(PaperStore);

    const paperStore = await PaperStoreRepository.findOne(id);

    if (!paperStore) {
      return res
        .status(400)
        .json({ error: 'This paper store does not exists.' });
    }

    const products = await ProductRepository.find({
      where: {
        paperStore,
      },
    });

    return res.json(products);
  }
}

export default new ProductController();
