/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PaperStoreTable1616515781483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PaperStore',
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
            name: 'email',
            type: 'varchar(150)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(16)',
          },
          {
            name: 'balance',
            type: 'decimal',
          },
          {
            name: 'street',
            type: 'varchar(150)',
          },
          {
            name: 'neighborhood',
            type: 'varchar(150)',
          },
          {
            name: 'city',
            type: 'varchar(150)',
          },
          {
            name: 'state',
            type: 'varchar(150)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PaperStore');
  }
}
