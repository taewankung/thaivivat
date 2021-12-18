import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTicket1639825618390 implements MigrationInterface {
    name = 'updateTicket1639825618390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UNIQUE_TICKET\` ON \`ticket\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`UNIQUE_TICKET\` ON \`ticket\` (\`plateNumber\`)`);
    }

}
