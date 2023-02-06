import { MigrationInterface, QueryRunner } from 'typeorm';

export class Last1675713451398 implements MigrationInterface {
  name = 'Last1675713451398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content_comment" ("comment_id" BIGSERIAL NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" bigint, "cardId" bigint, CONSTRAINT "PK_794d387b8d520c617736257e8c2" PRIMARY KEY ("comment_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" ADD CONSTRAINT "FK_da8475e723d1f9789ead5983443" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" ADD CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea" FOREIGN KEY ("cardId") REFERENCES "card"("card_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_comment" DROP CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" DROP CONSTRAINT "FK_da8475e723d1f9789ead5983443"`,
    );
    await queryRunner.query(`DROP TABLE "content_comment"`);
  }
}
