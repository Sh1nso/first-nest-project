import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcommentEntity21674628223433 implements MigrationInterface {
    name = 'AddcommentEntity21674628223433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_comment" RENAME COLUMN "card_id" TO "comment_id"`);
        await queryRunner.query(`ALTER TABLE "content_comment" RENAME CONSTRAINT "PK_2879f3b38239bff74bbe4267d88" TO "PK_794d387b8d520c617736257e8c2"`);
        await queryRunner.query(`ALTER SEQUENCE "content_comment_card_id_seq" RENAME TO "content_comment_comment_id_seq"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME COLUMN "card_id" TO "comment_id"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME CONSTRAINT "PK_9a060562f2684afa4207b1ff103" TO "PK_a2e3a49c7dbd33e9ff1eb9812d5"`);
        await queryRunner.query(`ALTER SEQUENCE "card_card_id_seq" RENAME TO "card_comment_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "card_comment_id_seq" RENAME TO "card_card_id_seq"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME CONSTRAINT "PK_a2e3a49c7dbd33e9ff1eb9812d5" TO "PK_9a060562f2684afa4207b1ff103"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME COLUMN "comment_id" TO "card_id"`);
        await queryRunner.query(`ALTER SEQUENCE "content_comment_comment_id_seq" RENAME TO "content_comment_card_id_seq"`);
        await queryRunner.query(`ALTER TABLE "content_comment" RENAME CONSTRAINT "PK_794d387b8d520c617736257e8c2" TO "PK_2879f3b38239bff74bbe4267d88"`);
        await queryRunner.query(`ALTER TABLE "content_comment" RENAME COLUMN "comment_id" TO "card_id"`);
    }

}
