//TODO: for request missing data, send usage in response
import ReqHandler from "../types/ReqHandler";
// import ResponseInterface from "../interfaces/ResponseInterface";
// import UserInterface from "../interfaces/UserInterface";
import codes from "../statusCodes";
// import HttpError from "../exceptions/HttpException";
// import User from "../models/UserModel";
// import logger from "../config/logging";
// import signToken from "../functions/signToken";

const {} = codes;

//POST routes

export const addMonth: ReqHandler = async (_, res, __) => {
  res.json("add month route");
};
