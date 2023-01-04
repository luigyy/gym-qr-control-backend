"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signToken_1 = __importDefault(require("../functions/signToken"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const secret = config_1.default.server.token.secret;
const { MISSING_TOKEN, INVALID_TOKEN, } = statusCodes_1.default;
//middleware mainly used for securing private, routes. 
//Also has an used in /routes/authenticationController for validating token
//if user already has one in route /checkToken.
const checkToken = (req, res, next) => {
    //Get the jwt token from the head
    const token = req.headers["auth"];
    if (!token)
        return next(new HttpException_1.default(MISSING_TOKEN));
    let jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, secret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        return next(new HttpException_1.default(INVALID_TOKEN));
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { id, name, email } = jwtPayload;
    const newToken = signToken_1.default(id, name, email);
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
exports.default = checkToken;
//# sourceMappingURL=checkToken.js.map