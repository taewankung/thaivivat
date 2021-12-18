import {MigrationInterface, QueryRunner} from "typeorm";

export class intial1639825312670 implements MigrationInterface {
    name = 'intial1639825312670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parkingIot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(255) NOT NULL, \`status\` text NOT NULL, \`mac\` varchar(30) NOT NULL, UNIQUE INDEX \`UNIQUE_PARKING_IOT\` (\`mac\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`slot_parking_iot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slot\` text NOT NULL, \`size\` text NOT NULL, \`parkingIotId\` int NULL, UNIQUE INDEX \`REL_66e89949b0dfb15b636e5a6efc\` (\`parkingIotId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plateNumber\` varchar(255) NOT NULL, \`size\` text NOT NULL, \`allocatedParkSlotId\` int NULL, UNIQUE INDEX \`UNIQUE_TICKET\` (\`plateNumber\`), UNIQUE INDEX \`REL_e78a911a96221195de82b6bf27\` (\`allocatedParkSlotId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`slot_parking_iot\` ADD CONSTRAINT \`FK_66e89949b0dfb15b636e5a6efc2\` FOREIGN KEY (\`parkingIotId\`) REFERENCES \`parkingIot\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_e78a911a96221195de82b6bf27c\` FOREIGN KEY (\`allocatedParkSlotId\`) REFERENCES \`slot_parking_iot\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_e78a911a96221195de82b6bf27c\``);
        await queryRunner.query(`ALTER TABLE \`slot_parking_iot\` DROP FOREIGN KEY \`FK_66e89949b0dfb15b636e5a6efc2\``);
        await queryRunner.query(`DROP INDEX \`REL_e78a911a96221195de82b6bf27\` ON \`ticket\``);
        await queryRunner.query(`DROP INDEX \`UNIQUE_TICKET\` ON \`ticket\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP INDEX \`REL_66e89949b0dfb15b636e5a6efc\` ON \`slot_parking_iot\``);
        await queryRunner.query(`DROP TABLE \`slot_parking_iot\``);
        await queryRunner.query(`DROP INDEX \`UNIQUE_PARKING_IOT\` ON \`parkingIot\``);
        await queryRunner.query(`DROP TABLE \`parkingIot\``);
    }

}
