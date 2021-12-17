import express from "express";
import res from "express/lib/response";
import http from "http";

import {createConnection, Connection, getRepository} from "typeorm";
import ParkingIot from "./model/parking";
import Ticket from "./model/ticket";

const ServerApp = async () => {
     const app = express();
     const PORT = "3000";
     const connection = await createConnection({
          type: "mysql",
          host: "localhost",
          port: 3306,
          username: "root",
          password: "",
          database: "testdb",
     });

     const parkingIotRepo = getRepository(ParkingIot);
     const ticketRepo = getRepository(Ticket);

     http.createServer(app).listen(3000, () => {
          console.log("server status : running");
          console.log(`run on port : ${PORT}`);
     });

     app.use("/", (req, res) => {
          console.log("enter route");
          let text = "Parking";
          res.send(text);
     });

     // #1 It should provide us with api to create parking lot
     app.post("/create/parking", async (req, res)=>{
          console.log("create parking iot");
          const body = req.body;
          const name = body.name;
          const parkingIot = ParkingIot.new();
          parkingIot.name = name;
          await parkingIotRepo.save(parkingIot);
          res.send("create parking iot")
     });
     // #2 It should provide us with api to park the car
     app.post("/park", async (req, res)=>{
          const body = req.body;
          const name = body.name;
          const parkingIot = await parkingIotRepo.findOne({
               name: name
          });
          if(!parkingIot){
               res.send("haven't that parking iot");
          }
          else{
               parkingIot.status = "BUSIED";
               await parkingIotRepo.save(parkingIot);
               res.send("parked");
          }
     });
     // #3 It should provide us with api to leave the slot
     app.post("/leave", async (req, res)=>{
          const body = req.body;
          const name = body.name;
          const parkingIot = await parkingIotRepo.findOne({
               name: name
          });
          if(!parkingIot){
               res.send("haven't that parking iot");
          }
          else{
               parkingIot.status = "Empty";
               await parkingIotRepo.save(parkingIot);
               res.send("leaved");
          }
     });
     // #4 It should provide us with api to get status of parking lot
     app.get("/status/:name", async (req, res)=>{
          let {name} = req.params
          const parkingIot = await parkingIotRepo.findOne({
               name: name
          });
          if(!parkingIot){
               res.send("haven't that parking iot");
          }
          else{
               res.json({
                    "name" :name,
                    "status": parkingIot.status
               });
          }
     });

     // #7 It should provide us with api to get registration plate number list by car size
     app.post("/create/ticket", async (req, res)=>{
          let {plateNumber, size, alocatedParkSlot} = req;
          const ticket = new Ticket();
          ticket.plateNumber = plateNumber;
          ticket.size = size;
          ticket.alocatedParkSlot = alocatedParkSlot;
          await ticketRepo.save(ticket);
          res.send("registation");  
     });
       

     // #5 It should provide us with api to get registration plate number list by car size
     app.get("/registation/plateNumberList/:carSize", async (req, res)=>{
        res.send("registation");  
     });

     // #6 It should provide us with api to get registration allocated slot number list by car size
     app.get("/registation/allocated/:carSize", async (req, res)=>{
          res.send("registation");  
     });

}

ServerApp();
export default ServerApp;