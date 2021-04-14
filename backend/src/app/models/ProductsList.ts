import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import List from './List';
import Product from './Product';

@Entity('ProductsList')
class ProductsList {
  @PrimaryColumn()
  listId: number;

  @JoinColumn({ name: 'listId' })
  @ManyToOne(type => List, list => list.productsList)
  list: List;

  @PrimaryColumn()
  productId: number;

  @JoinColumn({ name: 'productId' })
  @ManyToOne(type => Product, product => product.productsList)
  product: Product;

  @Column('tinyint')
  received: number;

  @Column('tinyint')
  purchased: number;
}

export default ProductsList;
