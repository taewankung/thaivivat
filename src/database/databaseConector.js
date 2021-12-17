import url from "url";
import {createConnection} from "typeorm";

import config from "../config";

export default async () => {
    const dbURL = url.parse(config.databaseURL);
    const dbType = dbURL.protocol.substr(0, dbURL.protocol.length - 1);
    const user = dbURL.auth.substr(0, dbURL.auth.indexOf(":"));
    const pass = dbURL.auth.substr(dbURL.auth.indexOf(":") + 1, dbURL.auth.length);
    const host = dbURL.hostname;
    const db = dbURL.path.substr(1, dbURL.path.length);
    try {
        const connection =await createConnection({
            type: dbType,
            host: host,
            port: dbURL.port,
            username: user,
            password: pass,
            database: db,
            entities: [__dirname + "/../model/*.js"],
            synchronize: false,
            extra:{
                "connectionLimit": 3
            }
            // logging: true
        });
        return connection;
    }
    catch(error){
      console.log("error conection.")
        console.log(error);
    }
};
