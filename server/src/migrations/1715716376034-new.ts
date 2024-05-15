import { MigrationInterface, QueryRunner } from 'typeorm';

export class New1715716376034 implements MigrationInterface {
	name = 'New1715716376034';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "todo_card" DROP COLUMN "updateAt"`);
		await queryRunner.query(`ALTER TABLE "todo_card" DROP COLUMN "deletedAt"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "todo_card" ADD "deletedAt" TIMESTAMP`,
		);
		await queryRunner.query(
			`ALTER TABLE "todo_card" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
	}
}
