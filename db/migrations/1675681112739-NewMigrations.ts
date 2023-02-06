import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class NewMigrations1675681112739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email_address',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sex',
            type: 'varchar',
            isNullable: true,
            default: '',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'ContentColumn',
        columns: [
          {
            type: 'int',
            name: 'column_id',
            isPrimary: true,
          },
          {
            type: 'varchar',
            name: 'name',
            isNullable: false,
          },
          {
            type: 'varchar',
            name: 'description',
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'Card',
        columns: [
          {
            type: 'int',
            name: 'column_id',
            isPrimary: true,
          },
          {
            type: 'varchar',
            name: 'name',
            isNullable: false,
          },
          {
            type: 'varchar',
            name: 'description',
          },
          {
            name: 'theme',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'columnId',
            type: 'int',
          },
        ],
      }),
      true,
    ),
      await queryRunner.createTable(
        new Table({
          name: 'ContentComment',
          columns: [
            {
              name: 'content',
              type: 'varchar',
            },
            {
              name: 'userId',
              type: 'int',
            },
            {
              name: 'cardId',
              type: 'int',
            },
          ],
        }),
      );

    await queryRunner.createForeignKey(
      'Card',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'ContentColumn',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Card',
      new TableForeignKey({
        columnNames: ['columnId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ContentColumn',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ContentComment',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ContentComment',
      new TableForeignKey({
        columnNames: ['cardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ContentColumn',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ContentComment');
  }
}
