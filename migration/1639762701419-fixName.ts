import {MigrationInterface, QueryRunner} from "typeorm";

export class fixName1639762701419 implements MigrationInterface {
    name = 'fixName1639762701419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`alocatedParkSlot\` \`allocatedParkSlot\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`allocatedParkSlot\` \`alocatedParkSlot\` text NOT NULL`);
    }

}
