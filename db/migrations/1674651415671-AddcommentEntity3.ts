import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcommentEntity31674651415671 implements MigrationInterface {
    name = 'AddcommentEntity31674651415671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" RENAME COLUMN "comment_id" TO "card_id"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME CONSTRAINT "PK_a2e3a49c7dbd33e9ff1eb9812d5" TO "PK_9a060562f2684afa4207b1ff103"`);
        await queryRunner.query(`ALTER SEQUENCE "card_comment_id_seq" RENAME TO "card_card_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "card_card_id_seq" RENAME TO "card_comment_id_seq"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME CONSTRAINT "PK_9a060562f2684afa4207b1ff103" TO "PK_a2e3a49c7dbd33e9ff1eb9812d5"`);
        await queryRunner.query(`ALTER TABLE "card" RENAME COLUMN "card_id" TO "comment_id"`);
    }

}
