import ParkingIot from "../../model/parking";

export default async (req, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];
    // console.log("create parking iot");
    const {name, mac} = req.body;
    const parkingIot = new ParkingIot();
    parkingIot.name = name;
    parkingIot.mac = mac;
    await parkingIotRepo.save(parkingIot);
    return parkingIot;
}