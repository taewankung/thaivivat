export default async (req, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    const slotRepo = repoDict["slotParkingIotRepo"];
    const {name} = req.body;
    const parkingIot = await parkingIotRepo.findOne({
        name: name
    });
    if (!parkingIot) {
        return null
        // res.send("haven't that parking iot");
    } else {
        parkingIot.status = "PARKED";
        await parkingIotRepo.save(parkingIot);
        let slot = await slotRepo.findOne({parkingIot:parkingIot});
        return {
            ...parkingIot,
            slot: slot.slot
        };
    }
}