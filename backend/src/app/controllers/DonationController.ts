import { Request, Response } from 'express';
import { getRepository, SelectQueryBuilder } from 'typeorm';
import List from '../models/List';
import PaperStore from '../models/PaperStore';
import Product from '../models/Product';
import ProductsList from '../models/ProductsList';
import Student from '../models/Student';

class DonationController {
  async donation(req: Request, res: Response) {
    const { listId, productsIds } = req.body;

    const ProductsRepository = getRepository(ProductsList);

    // eslint-disable-next-line consistent-return
    productsIds.forEach(async (productId: number) => {
      try {
        await ProductsRepository.update(
          { listId, productId },
          { purchased: 1 },
        );
      } catch (e) {
        return res
          .status(400)
          .json({ error: 'could not be paid, try again later' });
      }
    });
    return res.sendStatus(200);
  }

  async confirmTransaction(req: Request, res: Response) {
    const { listId, productId, studentId } = req.body;
    const { parentId } = req;

    const ProductsListRepository = getRepository(ProductsList);
    const ProductRepository = getRepository(Product);
    const PaperStoreRepository = getRepository(PaperStore);
    const StudentRepository = getRepository(Student);

    try {
      const product = await ProductRepository.findOne(productId, {
        relations: ['paperStore'],
      });

      if (!product) {
        return res.status(400).json({ error: 'Product does not exists' });
      }
      const list = await ProductsListRepository.findOne({
        where: { listId, productId },
        relations: ['list', 'list.student'],
      });

      if (!list || list.list.student.id !== studentId) {
        return res.status(400).json({ error: 'List does not exists' });
      }

      const student = await StudentRepository.findOne({
        relations: ['parent'],
        where: (qb: SelectQueryBuilder<List>) => {
          qb.where(
            `student.id = :studentId and Student__parent.id = :parentId`,
            {
              studentId,
              parentId,
            },
          );
        },
      });

      if (!student) {
        return res
          .status(400)
          .json({ error: 'Parent is not related with student' });
      }

      if (list.purchased !== 1) {
        return res
          .status(400)
          .json({ error: 'You cannot recieve the product yet' });
      }

      await ProductsListRepository.update(
        { listId, productId },
        { received: 1 },
      );

      const { id } = product.paperStore;

      const store = await PaperStoreRepository.findOne(id);

      if (!store) {
        return res
          .status(400)
          .json({ error: 'could not be paid, try again later' });
      }

      const balance = store.balance + product.price;

      await PaperStoreRepository.update({ id }, { balance });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'could not be paid, try again later' });
    }

    return res.sendStatus(200);
  }
}

export default new DonationController();
