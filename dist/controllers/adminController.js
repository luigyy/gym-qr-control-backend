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
exports.getUsers = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const { SERVER_ERROR, SUCCESS } = statusCodes_1.default;
const getUsers = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get users from database
    let users;
    try {
        users = yield UserModel_1.default.find({});
        if (!users) {
            return next(new HttpException_1.default(SERVER_ERROR));
        }
    }
    catch (_a) {
        return next(new HttpException_1.default(SERVER_ERROR));
    }
    const response = {
        statusCode: SUCCESS.code,
        error: false,
        message: "Users retrieve from database successfully",
        data: {
            userData: users,
        },
    };
    res.status(SUCCESS.code).json(response);
});
exports.getUsers = getUsers;
//# sourceMappingURL=adminController.js.map