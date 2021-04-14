import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class SchoolTable1616515090902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'School',
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
    await queryRunner.dropTable('School');
  }
}
