import {MigrationInterface, QueryRunner} from "typeorm";

export class init1639679071175 implements MigrationInterface {
    name = 'init1639679071175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parkingIot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`status\` text NOT NULL DEFAULT 'empty', UNIQUE INDEX \`uniqueName\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plateNumber\` text NOT NULL, \`size\` text NOT NULL, \`alocatedParkSlot\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP INDEX \`uniqueName\` ON \`parkingIot\``);
        await queryRunner.query(`DROP TABLE \`parkingIot\``);
    }

}
