"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQRtest = void 0;
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
const sendQrEmail = (To, id) => {
    const payload = "id : " + id;
    //create qr image file
    const result = generateQrImage(payload);
    if (!result) {
        return false;
    }
    nodejs_nodemailer_outlook_1.default.sendEmail({
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
        onSuccess: () => { },
        onError: (e) => {
            console.log(e);
            throw e;
        },
    });
    //delete file
    //fs.unlinkSync(DEFAULT_IMAGE_PATH + DEFAULT_IMAGE_NAME);
    return true;
};
function sendQRtest() {
    const nodeoutlook = require("nodejs-nodemailer-outlook");
    nodeoutlook.sendEmail({
        auth: {
            user: "gymcontrol123@outlook.com",
            pass: "cartago23",
        },
        from: "gymcontrol123@outlook.com",
        to: "valverdejareth@gmail.com",
        subject: "Hey you, awesome!",
        html: "<b>This is bold text</b>",
        text: "This is text version!",
        replyTo: "valverdejareth@gmail.com",
        onSuccess: (i) => console.log(i),
        onError: (e) => console.log(e),
    });
}
exports.sendQRtest = sendQRtest;
exports.default = sendQrEmail;
//# sourceMappingURL=sendQrEmail.js.map