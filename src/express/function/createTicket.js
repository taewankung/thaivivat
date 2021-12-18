import Ticket from "../../model/ticket";

export default async (req, repoDict) => {
        const ticketRepo = repoDict["ticketRepo"];
        const slotParkingIotRepo = repoDict["slotParkingIotRepo"];
        let {plateNumber, size} = req.body;
        const ticketList = await ticketRepo.find({
            relations: ["allocatedParkSlot"]
        });
        // console.log(ticketList);
        const allocatedParkSlotListId = ticketList.map((ticket)=>(ticket.allocatedParkSlot.id));

        const ticket = new Ticket();
        ticket.plateNumber = plateNumber;
        ticket.size = size;
        let slots = await slotParkingIotRepo.find({
            where:{size: size},
            relations: ["parkingIot"]
        });
        // console.log(slots);
        const emptySlot = await slots.find((slot)=>(
            slot.parkingIot.status === "EMPTY" && !(slot.id in allocatedParkSlotListId)
        ));

        if(emptySlot) {
            ticket.allocatedParkSlot = emptySlot;

            await ticketRepo.save(ticket);
            // await ticketRepo.save(ticket);
            return ticket;

        }else{
            return null;

        }
    }