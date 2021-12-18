const url = require("url");

// let dotenv = require("dotenv");
const test = process.env.test
console.log(test)
const databaseUrlPro = process.env.DATABASE_URL || "mysql://root:@127.0.0.1:7777/parkingIOT";
const databaseUrlTest = process.env.TEST_DATABASE_URL || "mysql://root:@127.0.0.1:7777/testParkingIOT";

const databaseUrl = test? databaseUrlTest : databaseUrlPro;
console.log(databaseUrl);
console.log(test? true: false)
const dbURL = url.parse(databaseUrl);

const dbType = dbURL.protocol.substr(0, dbURL.protocol.length - 1);
const user = dbURL.auth.substr(0, dbURL.auth.indexOf(':'));
const pass = dbURL.auth.substr(dbURL.auth.indexOf(':') + 1, dbURL.auth.length);
const host = dbURL.hostname;
const db = dbURL.path.substr(1, dbURL.path.length);

module.exports = {
    "type": dbType,
    "host": host,
    "port": dbURL.port,
    "username": user,
    "password": pass,
    "database": db,
    "entities": ["dist/model/*.js"],
    "migrationsTableName": "parking_migration_table",
    "migrations": ["migration/*.ts"],
    "cli": {
        "migrationsDir": "migration"
    }
 }