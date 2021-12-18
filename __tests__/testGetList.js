import {connector} from '../src/database/databaseConector';
import {getRepository} from "typeorm";
import ParkingIot from "../src/model/parking";
import Ticket from "../src/model/ticket";
import SlotParkingIot from "../src/model/slotParkingIot";

import createParkingIot from "../src/express/function/createParkingIot";
import createSlot from "../src/express/function/createSlot";
import createTicket from "../src/express/function/createTicket";
import iotStatus from "../src/express/function/iotStatus";
import parked from "../src/express/function/parked";
import leaved from "../src/express/function/leaved";
import getPlateNumberListBySized from "../src/express/function/getPlateNumberListBySized";
import allocatedListBySize from "../src/express/function/allocatedListBySize";

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

it('get status Parking Iot', async () => {
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
        "params": {
            name: "No.1"
        }
    }
    let result = await iotStatus(req, repoDict);
    expect(result).toEqual({
        "name": "No.1",
        "status": "EMPTY"
    })
    req = {
        "body": {
            name: "No.1",
        }
    }
    await parked(req, repoDict);
    req = {
        "params": {
            name: "No.1"
        }
    }
    result = await iotStatus(req, repoDict);
    expect(result).toEqual({
        "name": "No.1",
        "status": "PARKED"
    })
});

it('get plate number list by sized', async () => {
    const parkingIotRepo = getRepository(ParkingIot);
    const ticketRepo = getRepository(Ticket);
    const slotParkingIotRepo = getRepository(SlotParkingIot);
    const repoDict = {
        "parkingIotRepo": parkingIotRepo,
        "ticketRepo": ticketRepo,
        "slotParkingIotRepo": slotParkingIotRepo
    }
    let reqList = [{
        "body": {
            name: "No.1",
            mac: "888"
        }
    },{
        "body": {
            name: "No.2",
            mac: "889"
        }
    },
    {
        "body": {
            name: "No.3",
            mac: "890"
        }
    }]
    const parkingIotList = [];
    for(let req of reqList) {
        const parkingIot = await createParkingIot(req, repoDict);
        parkingIotList.push(parkingIot);
    }
    reqList = [];
    const sizeList = ["medium","small", "large"];
    for(let [index, parkingIot] of parkingIotList.entries()){
        reqList.push(
            {
                "body": {
                    parkingIotId: parkingIot.id,
                    slotName: `No.${index + 1}`,
                    size: sizeList[index % 3]
                }
            }
        );
    }

    for(let req of reqList) {
        const slot = await createSlot(req, repoDict);
    }

    // console.log(result);
    reqList =[
        {
            "body": {
                plateNumber: "152687",
                size: "medium"
            }
        },
        {
            "body": {
                plateNumber: "123458",
                size: "small"
            }
        },
        {
            "body": {
                plateNumber: "9965",
                size: "large"
            }
        },

    ]

    for(let req of reqList) {

        const ticket = await createTicket(req, repoDict);
    }
    const req = {
        "params": {
            carSize: "medium",
        }
}
    const result = await getPlateNumberListBySized(req, repoDict);
    console.log(result);
    expect(result).toEqual(['152687'])
});
it('get allocated list by sized', async () => {
    const parkingIotRepo = getRepository(ParkingIot);
    const ticketRepo = getRepository(Ticket);
    const slotParkingIotRepo = getRepository(SlotParkingIot);
    const repoDict = {
        "parkingIotRepo": parkingIotRepo,
        "ticketRepo": ticketRepo,
        "slotParkingIotRepo": slotParkingIotRepo
    }
    let reqList = [{
        "body": {
            name: "No.1",
            mac: "888"
        }
    },{
        "body": {
            name: "No.2",
            mac: "889"
        }
    },
    {
        "body": {
            name: "No.3",
            mac: "890"
        }
    }]
    const parkingIotList = [];
    for(let req of reqList) {
        const parkingIot = await createParkingIot(req, repoDict);
        parkingIotList.push(parkingIot);
    }
    reqList = [];
    const sizeList = ["medium","small", "large"];
    for(let [index, parkingIot] of parkingIotList.entries()){
        reqList.push(
            {
                "body": {
                    parkingIotId: parkingIot.id,
                    slotName: `No.${index + 1}`,
                    size: sizeList[index % 3]
                }
            }
        );
    }

    for(let req of reqList) {
        const slot = await createSlot(req, repoDict);
    }

    // console.log(result);
    reqList =[
        {
            "body": {
                plateNumber: "152687",
                size: "medium"
            }
        },
        {
            "body": {
                plateNumber: "123458",
                size: "small"
            }
        },
        {
            "body": {
                plateNumber: "9965",
                size: "large"
            }
        },

    ]

    for(let req of reqList) {

        const ticket = await createTicket(req, repoDict);
    }
    const req = {
        "params": {
            carSize: "medium",
        }
}
    const result = await allocatedListBySize(req, repoDict);
    console.log(result);
    for(let r of result){
        expect(r.size).toBe("medium");
        expect(r.slot).toBe("No.1");
    }
});
