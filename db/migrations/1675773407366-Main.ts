import { MigrationInterface, QueryRunner } from 'typeorm';

export class Main1675773407366 implements MigrationInterface {
  name = 'Main1675773407366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "content_comment" ("comment_id" BIGSERIAL NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" bigint, "cardId" bigint, CONSTRAINT "PK_794d387b8d520c617736257e8c2" PRIMARY KEY ("comment_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" BIGSERIAL NOT NULL, "username" character varying NOT NULL DEFAULT '', "email_address" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "sex" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_a8979f71f59cb66a8b03bde38c1" UNIQUE ("email_address"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_column" ("column_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "userId" bigint, CONSTRAINT "PK_61cd5b964fa4bcef7e3e48a25ca" PRIMARY KEY ("column_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("card_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "theme" character varying NOT NULL, "description" character varying NOT NULL, "userId" bigint, "columnId" bigint, CONSTRAINT "PK_9a060562f2684afa4207b1ff103" PRIMARY KEY ("card_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" ADD CONSTRAINT "FK_da8475e723d1f9789ead5983443" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" ADD CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea" FOREIGN KEY ("cardId") REFERENCES "card"("card_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_column" ADD CONSTRAINT "FK_f3ebddf84d898d5c3bc612f6e98" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_592a123bd8f9add5004b2aae1fb" FOREIGN KEY ("columnId") REFERENCES "content_column"("column_id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_592a123bd8f9add5004b2aae1fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_column" DROP CONSTRAINT "FK_f3ebddf84d898d5c3bc612f6e98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" DROP CONSTRAINT "FK_a1a7df8940c5a286d6f32676fea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_comment" DROP CONSTRAINT "FK_da8475e723d1f9789ead5983443"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "content_column"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "content_comment"`);
  }
}
