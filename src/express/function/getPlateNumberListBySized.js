export default async (req, repoDict) => {
    const ticketRepo = repoDict["ticketRepo"];

    const {carSize} = req.params;
    const tickets = await ticketRepo.find({
        where:{size: carSize}
    });
    const result = tickets.map((tickets)=>(tickets.plateNumber))
    return result;

}