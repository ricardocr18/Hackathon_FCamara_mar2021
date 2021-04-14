import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import List from '../models/List';
import Product from '../models/Product';
import ProductsList from '../models/ProductsList';

class ProductsListController {
  async store(req: Request, res: Response) {
    const { listId, productsIds } = req.body;

    const ListRepository = getRepository(List);
    const ProductRepository = getRepository(Product);
    const ProductsListRepository = getRepository(ProductsList);

    const list = await ListRepository.findOne({ id: listId });

    if (!list) {
      return res.status(400).json({ error: 'List does not exist' });
    }

    try {
      productsIds.forEach(async (id: number) => {
        const product = await ProductRepository.findOne({ id });

        if (product) {
          const listItem = ProductsListRepository.create({
            listId,
            productId: id,
            received: 0,
            purchased: 0,
          });

          await ProductsListRepository.save(listItem);
        }
      });

      return res.sendStatus(200);
    } catch (e) {
      return res.status(400).json({
        error: 'Product could not be inserted in the list, try again later',
      });
    }
  }
}

export default new ProductsListController();
