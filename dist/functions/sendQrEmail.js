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
//@ts-ignore
const nodejs_nodemailer_outlook_1 = __importDefault(require("nodejs-nodemailer-outlook"));
// import fs from "fs";
const qrcode_1 = __importDefault(require("qrcode"));
const logging_1 = __importDefault(require("../config/logging"));
//
const DEFAULT_IMAGE_NAME = "qr.png";
const DEFAULT_IMAGE_PATH = "./src/functions/";
//
// default account to send email
const user = "gymcontrol123@outlook.com";
const pass = "cartago23";
//
//
const generateQrImage = (payload) => {
    const opt = { width: 500 };
    var result = true;
    qrcode_1.default.toFile(DEFAULT_IMAGE_PATH + DEFAULT_IMAGE_NAME, 
    //@ts-ignore
    [{ data: payload, mode: "byte" }], opt)
        .then(() => {
        result = true;
    })
        .catch((err) => {
        logging_1.default.error(err.message);
        result = false;
    });
    return result;
};
/**
 *
 * @param To  receiver email
 * @id id  user id to generate qr code
 * @returns true if successfully sent, false otherwise
 */
const sendQrEmail = (To, id) => __awaiter(void 0, void 0, void 0, function* () {
    var returnValue = false;
    const payload = "id : " + id;
    //create qr image file
    const result = generateQrImage(payload);
    if (!result) {
        return false;
    }
    try {
        yield nodejs_nodemailer_outlook_1.default.sendEmail({
            auth: {
                user: user,
                pass: pass,
            },
            from: user,
            to: To,
            subject: "QR code for gym access",
            html: "<b>In the attachments, you can find an image with your QR code for gym access, either download it or screenshot and present it at the gym entrance</b>",
            text: "This is text version!",
            replyTo: "valverdejareth@gmail.com",
            attachments: [
                {
                    filename: "gymQRcode.png",
                    path: DEFAULT_IMAGE_PATH + DEFAULT_IMAGE_NAME,
                },
            ],
            onSuccess: () => {
                return (returnValue = true);
            },
            onError: (e) => {
                console.log(e);
                return (returnValue = false);
            },
        });
    }
    catch (err) {
        return false;
    }
    //delete file
    //fs.unlinkSync(DEFAULT_IMAGE_PATH + DEFAULT_IMAGE_NAME);
    return returnValue;
});
exports.default = sendQrEmail;
//# sourceMappingURL=sendQrEmail.js.map