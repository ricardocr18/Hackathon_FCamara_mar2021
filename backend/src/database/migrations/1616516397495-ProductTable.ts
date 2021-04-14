/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class ProductTable1616516397495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(150)',
          },
          {
            name: 'description',
            type: 'varchar(400)',
            isNullable: true,
          },
          {
            name: 'img_url',
            type: 'varchar(600)',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'paperStoreId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Product',
      new TableForeignKey({
        columnNames: ['paperStoreId'],
        referencedTableName: 'PaperStore',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Product');
  }
}
