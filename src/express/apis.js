import {Router} from "express";
import ParkingIot from "../model/parking";
import Ticket from "../model/ticket";

const route = Router();

const apis = (app, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    const ticketRepo = repoDict["ticketRepo"];

    app.use("/", route);
    route.post("/create/parking", async (req, res) => {
        console.log("create parking iot");
        const {name, mac} = req.body;
        const parkingIot = new ParkingIot();
        parkingIot.name = name;
        parkingIot.mac = mac;
        await parkingIotRepo.save(parkingIot);
        res.send("create parking iot")
    });
    // #2 It should provide us with api to park the car
    route.post("/parked", async (req, res) => {
        const {name} = req.body;
        const parkingIot = await parkingIotRepo.findOne({
            name: name
        });
        if (!parkingIot) {
            res.send("haven't that parking iot");
        } else {
            parkingIot.status = "PARKED";
            await parkingIotRepo.save(parkingIot);
            res.send("parked");
        }
    });
    // #3 It should provide us with api to leave the slot
    route.post("/leave", async (req, res) => {
        const body = req.body;
        const name = body.name;
        const parkingIot = await parkingIotRepo.findOne({
            name: name
        });
        if (!parkingIot) {
            res.send("haven't that parking iot");
        } else {
            parkingIot.status = "EMPTY";
            await parkingIotRepo.save(parkingIot);
            res.send("leaved");
        }
    });
    // #4 It should provide us with api to get status of parking lot
    route.get("/status/:name", async (req, res) => {
        let {name} = req.params
        const parkingIot = await parkingIotRepo.findOne({
            name: name
        });
        if (!parkingIot) {
            res.send("haven't that parking iot");
        } else {
            res.json({
                "name": name,
                "status": parkingIot.status
            });
        }
    });

    // #7 It should provide us with api to get registration plate number list by car size
    route.post("/create/ticket", async (req, res) => {
        let {plateNumber, size, alocatedParkSlot} = req.body;
        const ticket = new Ticket();
        ticket.plateNumber = plateNumber;
        ticket.size = size;
        ticket.alocatedParkSlot = alocatedParkSlot;
        await ticketRepo.save(ticket);
        res.send("registation");
    });

    // #5 It should provide us with api to get registration plate number list by car size
    route.get("/registation/plateNumberList/:carSize", async (req, res) => {
        const {carSize} = req.params;
        const parkingIot = await parkingIotRepo.find({
            name: carSize
        });
        const result = parkingIot.map((parking)=>(parking.allocated))
        res.send(parkingIot);
    });

    // #6 It should provide us with api to get registration allocated slot number list by car size
    route.get("/registation/allocated/:carSize", async (req, res) => {
        res.send("registation");
    });
}


export default {
    API: (repoDict) => {
        const app = Router();
        apis(app, repoDict);
        return app;
    },

};
