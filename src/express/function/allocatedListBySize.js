export default async (req, repoDict) => {
    const ticketRepo = repoDict["ticketRepo"];
    const {carSize} = req.params;
    const tickets = await ticketRepo.find({
        where:{size: carSize},
        relations: ["allocatedParkSlot"]
    });
    const result = tickets.map((tickets)=>(tickets.allocatedParkSlot))
    return result
}