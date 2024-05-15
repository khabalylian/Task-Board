import { MigrationInterface, QueryRunner } from 'typeorm';

export class New1715716476184 implements MigrationInterface {
	name = 'New1715716476184';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "todo_card" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "todo_card" ADD "deletedAt" TIMESTAMP`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "todo_card" DROP COLUMN "deletedAt"`);
		await queryRunner.query(`ALTER TABLE "todo_card" DROP COLUMN "updateAt"`);
	}
}
