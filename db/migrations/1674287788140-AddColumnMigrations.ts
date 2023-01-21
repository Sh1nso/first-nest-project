import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnMigrations1674287788140 implements MigrationInterface {
    name = 'AddColumnMigrations1674287788140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_column" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_column" DROP COLUMN "description"`);
    }

}
