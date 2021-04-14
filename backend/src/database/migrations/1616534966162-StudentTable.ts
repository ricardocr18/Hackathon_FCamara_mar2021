/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class StudentTable1616534966162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Student',
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
            name: 'birthDate',
            type: 'date',
          },
          {
            name: 'studentRA',
            type: 'varchar(150)',
          },
          {
            name: 'parentId',
            type: 'int',
          },
          {
            name: 'schoolId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'Student',
      new TableForeignKey({
        columnNames: ['parentId'],
        referencedTableName: 'Parent',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'Student',
      new TableForeignKey({
        columnNames: ['schoolId'],
        referencedTableName: 'School',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Student');
  }
}
