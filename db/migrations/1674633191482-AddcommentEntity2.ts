import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcommentEntity21674633191482 implements MigrationInterface {
    name = 'AddcommentEntity21674633191482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "theme"`);
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "content_comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "theme" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD "name" character varying NOT NULL`);
    }

}
