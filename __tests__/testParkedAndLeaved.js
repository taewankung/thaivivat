import {connector} from '../src/database/databaseConector';
import {getRepository} from "typeorm";
import ParkingIot from "../src/model/parking";
import Ticket from "../src/model/ticket";
import SlotParkingIot from "../src/model/slotParkingIot";

import createParkingIot from "../src/express/function/createParkingIot";
import createSlot from "../src/express/function/createSlot";
import parked from "../src/express/function/parked";
import leaved from "../src/express/function/leaved";


beforeAll(async () => {
    const options = {"test": true};
    await connector.create(options);
});

afterAll(async () => {
    await connector.clear();
    await connector.close();
});

beforeEach(async () => {
    // console.log("clear")
    await connector.clear();
});

it('test parked', async () => {
    // TODO
    const parkingIotRepo = getRepository(ParkingIot);
    const ticketRepo = getRepository(Ticket);
    const slotParkingIotRepo = getRepository(SlotParkingIot);
    const repoDict = {
        "parkingIotRepo": parkingIotRepo,
        "ticketRepo": ticketRepo,
        "slotParkingIotRepo": slotParkingIotRepo
    }
    let req = {
        "body": {
            name: "No.2",
            mac: "9999"
        }
    }
    const parkingIot = await createParkingIot(req, repoDict);
    req = {
        "body": {
            parkingIotId: parkingIot.id,
            slotName: "slot No.2",
            size: "medium"
        }
    }
    const slot = await createSlot(req, repoDict);
    req = {
        "body": {
            name: "No.2",
        }
    }
    const result = await parked(req, repoDict);
    // console.log(result)
    expect(result.status).toBe("PARKED");
    expect(result.slot).toBe("slot No.2");
});
it('test leaved', async () => {
    // TODO
    const parkingIotRepo = getRepository(ParkingIot);
    const ticketRepo = getRepository(Ticket);
    const slotParkingIotRepo = getRepository(SlotParkingIot);
    const repoDict = {
        "parkingIotRepo": parkingIotRepo,
        "ticketRepo": ticketRepo,
        "slotParkingIotRepo": slotParkingIotRepo
    }
    let req = {
        "body": {
            name: "No.2",
            mac: "9999"
        }
    }
    const parkingIot = await createParkingIot(req, repoDict);
    req = {
        "body": {
            parkingIotId: parkingIot.id,
            slotName: "slot No.2",
            size: "medium"
        }
    }
    const slot = await createSlot(req, repoDict);
    req = {
        "body": {
            name: "No.2",
        }
    }
    const parkedResult = await parked(req, repoDict);
    const result = await leaved(req, repoDict);
    // console.log(result);
    expect(result.status).toBe("EMPTY");
    expect(result.slot).toBe("slot No.2");
});