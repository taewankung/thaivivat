export default async (req, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    const slotRepo = repoDict["slotParkingIotRepo"];
    const ticketRepo = repoDict["ticketRepo"];
    const body = req.body;
    const name = body.name;
    const parkingIot = await parkingIotRepo.findOne({
        name: name
    });
    if (!parkingIot) {
        return null;
        // res.send("haven't that parking iot");
    } else {
        parkingIot.status = "EMPTY";
        await parkingIotRepo.save(parkingIot);

        let slot = await slotRepo.findOne({parkingIot: parkingIot});
        const ticket = await ticketRepo.findOne({
          allocatedParkSlot: slot
        });
        if(ticket){
            parkingIotRepo.delete(ticket);
        }
        return {
            ...parkingIot,
            slot: slot.slot
        };
    }
}