"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isId = exports.isEmail = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * verifie si la chaine renseigné est un email
 * check if email is valide
 * @param string emailAdress
 * @return bool
 */
const isEmail = (emailAdress) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regex))
        return true;
    else
        return false;
};
exports.isEmail = isEmail;
const isId = (id) => {
    return mongoose_1.default.isValidObjectId(id);
};
exports.isId = isId;
//# sourceMappingURL=regex.js.map