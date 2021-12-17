import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1639761812198 implements MigrationInterface {
    name = 'initial1639761812198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parkingIot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(255) NOT NULL, \`status\` text NOT NULL, \`mac\` varchar(30) NOT NULL, UNIQUE INDEX \`UNIQUE_PARKING_IOT\` (\`mac\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plateNumber\` varchar(255) NOT NULL, \`size\` text NOT NULL, \`alocatedParkSlot\` text NOT NULL, UNIQUE INDEX \`UNIQUE_TICKET\` (\`plateNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UNIQUE_TICKET\` ON \`ticket\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP INDEX \`UNIQUE_PARKING_IOT\` ON \`parkingIot\``);
        await queryRunner.query(`DROP TABLE \`parkingIot\``);
    }

}
