import {Router} from "express";
import ParkingIot from "../model/parking";
import Ticket from "../model/ticket";
import SlotParkingIot from "../model/slotParkingIot";

const route = Router();

const apis = (app, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    const ticketRepo = repoDict["ticketRepo"];
    const slotParkingIotRepo = repoDict["slotParkingIotRepo"];

    app.use("/", route);
    // app.get("/helo", route);
    route.post("/create/parking", async (req, res) => {
        console.log("create parking iot");
        const {name, mac} = req.body;
        const parkingIot = new ParkingIot();
        parkingIot.name = name;
        parkingIot.mac = mac;
        await parkingIotRepo.save(parkingIot);
        res.send("create parking iot")
    });

    // #7 If you have any idea to complete the api, feel free to add more
    route.post("/create/slot", async (req, res) => {
        const {parkingIotId, slotName, size } = req.body;
        const slot = new SlotParkingIot();
        const parkingIot = await parkingIotRepo.findOne({id:parkingIotId})
        if(parkingIot) {
            slot.slot = slotName;
            slot.parkingIot = parkingIot;
            slot.size = size;
            await slotParkingIotRepo.save(slot);
            res.send("create slot");
        }else{
            res.send("can't created");
        }
    });

    // #7 If you have any idea to complete the api, feel free to add more
    route.post("/create/ticket", async (req, res) => {
        let {plateNumber, size} = req.body;
        const ticket = new Ticket();
        ticket.plateNumber = plateNumber;
        ticket.size = size;
        let slots = await slotParkingIotRepo.find({
            size: size,
            relations: ["parkingIot"]
        });
        const emptySlot = await slots.find((slot)=>(
            slot.parkingIot.status === "EMPTY"
        ));
        if(emptySlot) {
            ticket.allocatedParkSlotId = emptySlot.id;
            ticket.allocatedParkSlot = emptySlot;
            console.log(ticket);
            await ticketRepo.save(ticket);
            // await ticketRepo.save(ticket);
            res.send("registation");
        }else{
            res.send("no slot");
        }
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

    // #5 It should provide us with api to get registration plate number list by car size
    route.get("/registation/plateNumberList/:carSize", async (req, res) => {
        const {carSize} = req.params;
        const tickets = await ticketRepo.find({
            size: carSize
        });
        const result = tickets.map((tickets)=>(tickets.plateNumber))
        res.send(result);
    });

    // #6 It should provide us with api to get registration allocated slot number list by car size
    route.get("/registation/allocated/:carSize", async (req, res) => {
        const {carSize} = req.params;
        const tickets = await ticketRepo.find({
            size: carSize,
            relations: ["allocatedParkSlot"]
        });
        const result = tickets.map((tickets)=>(tickets.allocatedParkSlot))
        res.send(result);
    });
}


export default {
    API: (repoDict) => {
        const app = Router();
        apis(app, repoDict);
        return app;
    },

};
