import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCardEntity1674454583949 implements MigrationInterface {
  name = 'AddCardEntity1674454583949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" ADD "theme" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "theme"`);
  }
}
