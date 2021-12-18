export default async (req, repoDict) => {
    const parkingIotRepo = repoDict["parkingIotRepo"];

    let {name} = req.params;
    const parkingIot = await parkingIotRepo.findOne({
        name: name
    });

    if (!parkingIot) {
        return null;
    } else {
        return {
            "name": name,
            "status": parkingIot.status
        }
    }
}
