import {Router} from "express";
import ParkingIot from "../model/parking";
import Ticket from "../model/ticket";
import SlotParkingIot from "../model/slotParkingIot";
import {
    createParkingIot,
    createSlot,
    createTicket,
    parked,
    leaved,
    iotStatus,
    getPlateNumberListBySized,
    allocatedListBySize,

} from "./function";

const route = Router();

const apis = (app, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    const ticketRepo = repoDict["ticketRepo"];
    const slotParkingIotRepo = repoDict["slotParkingIotRepo"];

    app.use("/", route);
    // app.get("/helo", route);
    // #1: It should provide us with api to create parking lot
    route.post("/create/parkingIot", async (req, res) => {
        await createParkingIot(req, repoDict);
        res.send("create parking iot");
    });

    // #7 If you have any idea to complete the api, feel free to add more
    route.post("/create/slot", async (req, res) => {
        const result = await createSlot(req, repoDict);
        if(result){
            res.send("create slot");
        }else{
            res.send("can't created");
        }
    });

    // #7 If you have any idea to complete the api, feel free to add more
    route.post("/create/ticket", async (req, res) => {
        const ticket = await createTicket(req, repoDict);
        if(ticket){
            res.send("registation");
        }else{
            res.send("no slot");
        }
    });

    // #2 It should provide us with api to park the car
    route.post("/parked", async (req, res) => {
        const result = await parked(req, repoDict);
        if (!result) {
            res.send("haven't that parking iot");
        } else {
            res.send("parked");
        }
    });
    // #3 It should provide us with api to leave the slot
    route.post("/leaved", async (req, res) => {
        const result = await leaved(req, repoDict);
        if (!result) {
            res.send("haven't that parking iot");
        } else {
            res.send("leaved");
        }
    });
    // #4 It should provide us with api to get status of parking lot
    route.get("/status/:name", async (req, res) => {
        const status = await iotStatus(req, repoDict);
        if (!status) {
            res.send("haven't that parking iot");
        } else {
            res.json(status);
        }
    });

    // #5 It should provide us with api to get registration plate number list by car size
    route.get("/registration/plateNumberList/:carSize",
        async (req, res) => {
        const plateNumberList = await getPlateNumberListBySized(req, repoDict);
        res.send(plateNumberList);
    }
    );

    // #6 It should provide us with api to get registration allocated slot number list by car size
    route.get("/registration/allocated/:carSize", async (req, res) => {
        const allocatedList = await allocatedListBySize(req, repoDict);
        res.send(allocatedList);
    });
}


export default {
    API: (repoDict) => {
        const app = Router();
        apis(app, repoDict);
        return app;
    },

};
