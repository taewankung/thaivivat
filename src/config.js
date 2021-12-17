import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// use dot env only for development
if (process.env.NODE_ENV === "development") {
    dotenv.config();
}

export default {
    databaseURL: process.env.DATABASE_URL || "mysql://root:@127.0.0.1:7777/parkingIOT",
    port: 3000
};
