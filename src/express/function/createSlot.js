import SlotParkingIot from "../../model/slotParkingIot";

export default async (req, repoDict) => {
        const parkingIotRepo = repoDict["parkingIotRepo"];
        const slotParkingIotRepo = repoDict["slotParkingIotRepo"];
        const {parkingIotId, slotName, size } = req.body;
        const slot = new SlotParkingIot();
        const parkingIot = await parkingIotRepo.findOne({id:parkingIotId})
        if(parkingIot) {
            slot.slot = slotName;
            slot.parkingIot = parkingIot;
            slot.size = size;
            await slotParkingIotRepo.save(slot);
            return slot;
        }else{
            return null;
        }
    }