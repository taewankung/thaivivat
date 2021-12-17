// let dotenv = require("dotenv");
const databaseUser = process.env.DATABASE_ORM_USER || "root";
const host = process.env.DATABASE_ORM_HOST || "localhost";
const user = process.env.DATABASE_USER || "root";
const port = process.env.PORT || "7777";
const password = process.env.DATABASE_ORM_PASSWORD || "";
const database = process.env.DATABASE_ORM || "parkingIOT";

module.exports = {
    "type": "mysql",
    "host": host,
    "port": port,
    "username": databaseUser,
    "password": password,
    "database": database,
    "entities": ["dist/model/*.js"],
    "migrationsTableName": "parking_migration_table",
    "migrations": ["migration/*.ts"],
    "cli": {
        "migrationsDir": "migration"
    }
 }