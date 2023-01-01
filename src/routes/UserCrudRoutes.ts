import express from "express";
const router = express.Router();
//
import {
  readUser,
  updateUser,
  deleteUser,
  readUserByName,
  sendQr,
} from "../controllers/userCrudController";

//create user already implemented in /auth/register
router.post("/readbyid/:id", readUser);
router.post("/readbyname/:name", readUserByName);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
router.post("/sendqr/:id", sendQr);

export default router;
