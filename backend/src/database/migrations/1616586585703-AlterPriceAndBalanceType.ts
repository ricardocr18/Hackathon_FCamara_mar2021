/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPriceAndBalanceType1616586585703
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE PaperStore ALTER COLUMN balance decimal(10,2) NOT NULL;',
    );
    queryRunner.query(
      'ALTER TABLE Product ALTER COLUMN price decimal(10,2) NOT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE PaperStore ALTER COLUMN balance decimal(18,0) NOT NULL;',
    );
    queryRunner.query(
      'ALTER TABLE Product ALTER COLUMN price decimal(18,0) NOT NULL;',
    );
  }
}
