/* eslint-disable import/prefer-default-export */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ProductsList1616536817170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ProductsList',
        columns: [
          {
            name: 'listId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'productId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'received',
            type: 'tinyint',
          },
          {
            name: 'purchased',
            type: 'tinyint',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ProductsList',
      new TableForeignKey({
        columnNames: ['listId'],
        referencedTableName: 'List',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'ProductsList',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedTableName: 'Product',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ProductsList');
  }
}
