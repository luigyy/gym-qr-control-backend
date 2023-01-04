"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//controllers
const membershipController_1 = require("../controllers/membershipController");
router.post("/addmonth/:id", membershipController_1.addMonth);
exports.default = router;
//# sourceMappingURL=membershipRoutes.js.map