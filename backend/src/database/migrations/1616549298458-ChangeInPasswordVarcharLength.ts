/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeInPasswordVarcharLength1616549298458
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE Parent ALTER COLUMN password VARCHAR (75) NOT NULL;',
    );
    queryRunner.query(
      'ALTER TABLE PaperStore ALTER COLUMN password VARCHAR (75) NOT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE Parent ALTER COLUMN password VARCHAR (16) NOT NULL',
    );
    queryRunner.query(
      'ALTER TABLE PaperStore ALTER COLUMN password VARCHAR (16) NOT NULL',
    );
  }
}
