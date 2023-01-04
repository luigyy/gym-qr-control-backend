"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("./logging"));
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../../.env` });
const mongoConnect = () => {
    mongoose_1.default
        .connect(process.env.NODE_ENV === "production"
        ? config_1.default.mongo.url
        : config_1.default.mongo.url_localhost, config_1.default.mongo.options)
        .catch((err) => {
        logging_1.default.error("Error when connecting to database");
        throw new Error(err.message);
    });
    mongoose_1.default.set("useCreateIndex", true);
    // when successfully connected
    mongoose_1.default.connection.on("connected", function () {
        logging_1.default.info("Successfully connected to database");
    });
    // if the connection throws an error
    mongoose_1.default.connection.on("error", function (err) {
        logging_1.default.warn("Mongoose default connection error: " + err);
    });
    // when the connection is disconnected
    mongoose_1.default.connection.on("disconnected", function () {
        console.log(config_1.default.mongo.url);
        logging_1.default.warn("Mongoose default connection disconnected");
    });
    // if the node process ends, close the mongoose connection
    process.on("SIGINT", function () {
        mongoose_1.default.connection.close(function () {
            logging_1.default.warn("Mongoose default connection disconnected through app termination");
            process.exit(0);
        });
    });
};
exports.default = mongoConnect;
//# sourceMappingURL=mongoConnect.js.map