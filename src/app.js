import express from "express";
import res from "express/lib/response";
// import http from "http";
import expressLoader from "./express/expressLoader";
import {createConnection, Connection, getRepository} from "typeorm";
import ParkingIot from "./model/parking";
import Ticket from "./model/ticket";
import connection from "./database/databaseConector";
import config from "./config"

const ServerApp = async () => {
     const app = express();
     const database = await connection();

     const parkingIotRepo = getRepository(ParkingIot);
     const ticketRepo = getRepository(Ticket);
     const repoDict = {
          "parkingIotRepo": parkingIotRepo,
          "ticketRepo": ticketRepo
     }
     expressLoader(app, repoDict);
     app.listen(config.port, () => console.log(`${Date(Date.now()).toString()} parkingIOT listening on port ${config.port}!`));
}

ServerApp();
export default ServerApp;