module.exports = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "testdb",
    "entities": ["dist/model/*.js"],
    "migrationsTableName": "parking_migration_table",
    "migrations": ["dist/migration/*.js"],
    "cli": {
        "migrationsDir": "migration"
    }
 }