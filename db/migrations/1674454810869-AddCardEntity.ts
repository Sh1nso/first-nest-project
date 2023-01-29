import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCardEntity1674454810869 implements MigrationInterface {
    name = 'AddCardEntity1674454810869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ALTER COLUMN "theme" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ALTER COLUMN "theme" DROP NOT NULL`);
    }

}
