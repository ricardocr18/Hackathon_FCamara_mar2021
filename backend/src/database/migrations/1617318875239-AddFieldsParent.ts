/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsParent1617318875239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE Parent ADD cpf VARCHAR(18) NOT NULL`);
    await queryRunner.query(`ALTER TABLE Parent ADD phone VARCHAR(20)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE Parent DROP COLUMN phone`);
    await queryRunner.query(`ALTER TABLE Parent DROP COLUMN cpf`);
  }
}
