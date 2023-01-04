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
exports.sendQr = exports.deleteUser = exports.updateUser = exports.readUserByName = exports.readUser = void 0;
// import UserInterface from "../interfaces/UserInterface";
const statusCodes_1 = __importDefault(require("../statusCodes"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const logging_1 = __importDefault(require("../config/logging"));
const sendQrEmail_1 = __importDefault(require("../functions/sendQrEmail"));
const regex_1 = require("../functions/regex");
const { MISSING_DATA, EMAIL_NOT_SENT, INVALID_NAME, DELETE_SUCCESS, UPDATE_SUCCESS, SUCCESS, SERVER_ERROR, INVALID_ID, } = statusCodes_1.default;
//
//
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    try {
        const user = yield UserModel_1.default.findOne({ _id: id });
        if (!user) {
            return next(new HttpException_1.default(INVALID_ID));
        }
        //user found, respond with success
        const response = {
            error: false,
            statusCode: SUCCESS.code,
            message: SUCCESS.message,
            //@ts-ignore
            data: { userData: user },
        };
        return res.status(SUCCESS.code).json(response);
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
});
exports.readUser = readUser;
//
//
//
const readUserByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    if (!name) {
        const fieldsRequired = ["name"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    try {
        const user = yield UserModel_1.default.find({ name });
        if (user.length === 0) {
            return next(new HttpException_1.default(INVALID_NAME));
        }
        //user found, respond with success
        const response = {
            error: false,
            statusCode: SUCCESS.code,
            message: SUCCESS.message,
            //@ts-ignore
            data: { userData: user },
        };
        return res.status(SUCCESS.code).json(response);
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
});
exports.readUserByName = readUserByName;
//
//
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { email, name, lastName } = req.body;
    //
    //check if id provide
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //check if all data is provided
    if (!(email && name && lastName)) {
        const fieldsRequired = ["email", "name", "lastName"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //all data provided
    const updateFields = {
        name,
        email,
        lastName,
    };
    try {
        const result = yield UserModel_1.default.updateOne({ _id: id }, updateFields);
        if (result.n === 0) {
            return next(new HttpException_1.default(INVALID_ID));
        }
        const response = {
            error: false,
            statusCode: UPDATE_SUCCESS.code,
            message: UPDATE_SUCCESS.message,
        };
        res.status(UPDATE_SUCCESS.code).json(response);
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
});
exports.updateUser = updateUser;
//
//
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    //check if id is provided
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //id provided, delete by id
    try {
        const result = yield UserModel_1.default.deleteOne({ _id: id });
        if (result.n === 0) {
            return next(new HttpException_1.default(INVALID_ID));
        }
        const response = {
            error: false,
            statusCode: DELETE_SUCCESS.code,
            message: DELETE_SUCCESS.message,
        };
        res.status(DELETE_SUCCESS.code).json(response);
    }
    catch (err) { }
});
exports.deleteUser = deleteUser;
const sendQr = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get
    const id = req.params.id;
    //check email
    if (!id) {
        const fieldsRequired = ["id"];
        return next(new HttpException_1.default(MISSING_DATA, fieldsRequired));
    }
    //check that id is a valid id
    if (!regex_1.isId(id)) {
        return next(new HttpException_1.default(INVALID_ID));
    }
    //check if theres an user with that email in db
    var user;
    try {
        user = yield UserModel_1.default.findOne({ _id: id }, { email: 1 });
        if (!user) {
            return next(new HttpException_1.default(INVALID_ID));
        }
    }
    catch (err) {
        logging_1.default.error(err.message);
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    const result = sendQrEmail_1.default(user.email, id);
    //check if successfully sent
    if (!result)
        return next(new HttpException_1.default(EMAIL_NOT_SENT));
    const response = {
        statusCode: SUCCESS.code,
        message: SUCCESS.message,
        error: false,
    };
    return res.status(SUCCESS.code).json(response);
});
exports.sendQr = sendQr;
//# sourceMappingURL=userCrudController.js.map