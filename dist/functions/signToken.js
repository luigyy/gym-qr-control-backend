"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = config_1.default.server.token.secret;
const algorithm = config_1.default.server.token.algorithm;
const issuer = config_1.default.server.token.issuer;
const expiresIn = config_1.default.server.token.expireTime;
const tokenOptions = {
    algorithm: algorithm,
    expiresIn: expiresIn,
    issuer: issuer
};
const signToken = (id, name, email) => {
    //create token
    const payload = {
        id,
        name,
        email
    };
    const token = jsonwebtoken_1.default.sign(payload, secret, tokenOptions);
    return token;
};
exports.default = signToken;
//# sourceMappingURL=signToken.js.map