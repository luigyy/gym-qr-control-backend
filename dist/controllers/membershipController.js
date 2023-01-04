"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMonth = void 0;
// import UserInterface from "../interfaces/UserInterface";
const statusCodes_1 = __importDefault(require("../statusCodes"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const logging_1 = __importDefault(require("../config/logging"));
// import signToken from "../functions/signToken";
const MembershipDateHandler_1 = require("../functions/MembershipDateHandler");
const mongoose_1 = require("mongoose");
const { MISSING_DATA, INVALID_ID, SERVER_ERROR, SUCCESS } = statusCodes_1.default;
//POST routes
const addMonth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // check if id
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //check if id is valid
    if (!mongoose_1.isValidObjectId(id)) {
        const response = {
            error: true,
            statusCode: INVALID_ID.code,
            message: INVALID_ID.message,
        };
        return res.status(INVALID_ID.code).json(response);
    }
    //get user from db
    var user;
    try {
        user = yield UserModel_1.default.findOne({ _id: id }, { expiresIn: 1 });
        if (!user) {
            const response = {
                error: true,
                statusCode: INVALID_ID.code,
                message: INVALID_ID.message,
            };
            return res.status(INVALID_ID.code).json(response);
        }
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //get expiresIn date
    const expiresIn = user === null || user === void 0 ? void 0 : user.expiresIn;
    const newExpirationDate = MembershipDateHandler_1.addMonthFunction(expiresIn);
    //update expiration date in db
    try {
        const response = yield UserModel_1.default.updateOne({ _id: id }, { expiresIn: newExpirationDate });
        if (response.n === 0) {
            const response = {
                error: true,
                statusCode: INVALID_ID.code,
                message: INVALID_ID.message,
            };
            return res.status(INVALID_ID.code).json(response);
        }
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    //respond with success
    const response = {
        statusCode: SUCCESS.code,
        message: SUCCESS.message,
        error: false,
    };
    return res.status(SUCCESS.code).json(response);
});
exports.addMonth = addMonth;
//# sourceMappingURL=membershipController.js.map