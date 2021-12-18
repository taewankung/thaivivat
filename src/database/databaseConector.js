import url from "url";
import {createConnection, getConnection} from "typeorm";

import config from "../config";

const connector = {
    async create(options={"test": false}) {
        const {test} = options;
        // console.log(test);
        const databaseURL = test===true? config.databaseTestURL: config.databaseURL;
        // console.log(databaseURL);
        const dbURL = url.parse(databaseURL);
        const dbType = dbURL.protocol.substr(0, dbURL.protocol.length - 1);
        const user = dbURL.auth.substr(0, dbURL.auth.indexOf(":"));
        const pass = dbURL.auth.substr(dbURL.auth.indexOf(":") + 1, dbURL.auth.length);
        const host = dbURL.hostname;
        const db = dbURL.path.substr(1, dbURL.path.length);

        const con = await createConnection({
            type: dbType,
            host: host,
            port: dbURL.port,
            username: user,
            password: pass,
            database: db,
            entities: [__dirname + "/../model/*.js"],
            synchronize: false,
            extra: {
                "connectionLimit": 3
            }
            // logging: true
        });
        return con;
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;
        const order = [
            "ticket",
            "slot_parking_iot",
            "parkingIot"
        ]
        for (let tableName of order){
            // console.log(entity.tableName);
            const entity = entities.find((e)=>(e.tableName===tableName));

            const repository = await connection.getRepository(entity.name);
            // console.log(`DELETE FROM ${entity.tableName}`);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        };
    },
};

export default async (options={"test": false}) => {
    try {
        const connection = await connector.create(options);
        return connection;
    } catch (error) {
        console.log("error conection.")
        console.log(error);
    }
};
export {connector};