"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//
const userCrudController_1 = require("../controllers/userCrudController");
//create user already implemented in /auth/register
router.post("/readbyid/:id", userCrudController_1.readUser);
router.post("/readbyname/:name", userCrudController_1.readUserByName);
router.post("/update/:id", userCrudController_1.updateUser);
router.post("/delete/:id", userCrudController_1.deleteUser);
router.post("/sendqr/:id", userCrudController_1.sendQr);
exports.default = router;
//# sourceMappingURL=UserCrudRoutes.js.map