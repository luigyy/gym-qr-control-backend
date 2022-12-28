import express from "express";
const router = express.Router();
//controllers
import { addMonth } from "../controllers/membershipController";

router.post("/addmonth/:id", addMonth);

export default router;
