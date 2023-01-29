import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcommentEntity1674627630000 implements MigrationInterface {
    name = 'AddcommentEntity1674627630000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content_comment" ("card_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "theme" character varying NOT NULL, "description" character varying NOT NULL, "userId" bigint, "cardId" bigint, CONSTRAINT "PK_2879f3b38239bff74bbe4267d88" PRIMARY KEY ("card_id"))`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD CONSTRAINT "FK_da8475e723d1f9789ead5983443" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_comment" ADD CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea" FOREIGN KEY ("cardId") REFERENCES "card"("card_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_comment" DROP CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea"`);
        await queryRunner.query(`ALTER TABLE "content_comment" DROP CONSTRAINT "FK_da8475e723d1f9789ead5983443"`);
        await queryRunner.query(`DROP TABLE "content_comment"`);
    }

}
