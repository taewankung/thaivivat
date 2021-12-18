import routes from "./apis";
import bodyParser from "body-parser";

import config from "../config";
import ParkingIot from "../model/parking";
import Ticket from "../model/ticket";

export default async (app, repoDict) => {
    app.use("/hello", (req, res) => {
        console.log("enter route");
        let text = "Parking";
        res.send(text);
    });
    app.use(bodyParser.json());
    app.use(`/api/`, routes.API(repoDict));
    // #1 It should provide us with api to create parking lot

};
