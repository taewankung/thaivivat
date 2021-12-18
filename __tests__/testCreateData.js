import {connector} from '../src/database/databaseConector';
import {getRepository} from "typeorm";
import ParkingIot from "../src/model/parking";
import Ticket from "../src/model/ticket";
import SlotParkingIot from "../src/model/slotParkingIot";

import createParkingIot from "../src/express/function/createParkingIot";
import createSlot from "../src/express/function/createSlot";
import createTicket from "../src/express/function/createTicket";


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

it('creates a parkingIot', async () => {
    // TODO
    const parkingIotRepo = getRepository(ParkingIot);
    const ticketRepo = getRepository(Ticket);
    const slotParkingIotRepo = getRepository(SlotParkingIot);
    const repoDict = {
        "parkingIotRepo": parkingIotRepo,
        "ticketRepo": ticketRepo,
        "slotParkingIotRepo": slotParkingIotRepo
    }
    const req = {
        "body": {
            name: "No.1",
            mac: "12345"
        }
    }
    const result = await createParkingIot(req, repoDict);
    // console.log(result);
    expect(result.name).toBe("No.1");
    expect(result.status).toBe("EMPTY");
    expect(result.mac).toBe("12345");
});

it('creates a Slot', async () => {
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
            name: "No.1",
            mac: "888"
        }
    }
    const parkingIot = await createParkingIot(req, repoDict);

    req = {
        "body": {
            parkingIotId: parkingIot.id,
            slotName: "No.1",
            size: "medium"
        }
    }
    const result = await createSlot(req, repoDict);
    // console.log(result);
    expect(result.slot).toBe("No.1");
    expect(result.size).toBe("medium");
    expect(result.parkingIot).toEqual(parkingIot);
});

it('creates a createTicket', async () => {
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
            name: "No.1",
            mac: "888"
        }
    }
    const parkingIot = await createParkingIot(req, repoDict);
    req = {
        "body": {
            parkingIotId: parkingIot.id,
            slotName: "No.1",
            size: "medium"
        }
    }
    const slot = await createSlot(req, repoDict);
    // console.log(result);
    req = {
        "body": {
            plateNumber: "152687",
            size: "medium"
        }
    }
    const result = await createTicket(req, repoDict);
    expect(result.plateNumber).toBe("152687");
    expect(result.size).toBe("medium");
    expect(result.allocatedParkSlot).toEqual(slot);
});