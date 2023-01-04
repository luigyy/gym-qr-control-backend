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
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const { SERVER_ERROR, UNAUTHORIZED, INVALID_TOKEN } = statusCodes_1.default;
const checkRole = (roles) => {
    return (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.id;
        //Get user role from the database
        try {
            const user = yield UserModel_1.default.findOne({ _id: id });
            if (!user) {
                return next(new HttpException_1.default(INVALID_TOKEN));
            }
            //Check if array of authorized roles includes the user's role
            if (!(roles.indexOf(user.role) > -1)) {
                //does not include, send error
                const response = {
                    statusCode: UNAUTHORIZED.code,
                    error: true,
                    message: UNAUTHORIZED.message,
                };
                return res.status(UNAUTHORIZED.code).send(response);
            }
            return next();
        }
        catch (_a) {
            return next(new HttpException_1.default(SERVER_ERROR));
        }
    });
};
exports.default = checkRole;
//# sourceMappingURL=checkRole.js.map