//TODO: for request missing data, send usage in response
import ReqHandler from "../types/ReqHandler";
import ResponseInterface from "../interfaces/ResponseInterface";
// import UserInterface from "../interfaces/UserInterface";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import UserSchema from "../models/UserModel";
import logger from "../config/logging";
// import signToken from "../functions/signToken";
import { addMonthFunction } from "../functions/MembershipDateHandler";
import { isValidObjectId } from "mongoose";

const { MISSING_DATA, INVALID_ID, SERVER_ERROR, SUCCESS } = codes;

//POST routes

export const addMonth: ReqHandler = async (req, res, next) => {
  const id = req.params.id;
  // check if id
  if (!id) {
    const fieldsRequired = ["id"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //check if id is valid
  if (!isValidObjectId(id)) {
    const response: ResponseInterface = {
      error: true,
      statusCode: INVALID_ID.code,
      message: INVALID_ID.message,
    };
    return res.status(INVALID_ID.code).json(response);
  }

  //get user from db
  var user;
  try {
    user = await UserSchema.findOne({ _id: id }, { expiresIn: 1 });
    if (!user) {
      const response: ResponseInterface = {
        error: true,
        statusCode: INVALID_ID.code,
        message: INVALID_ID.message,
      };
      return res.status(INVALID_ID.code).json(response);
    }
  } catch (err) {
    logger.error(err.message);
    return next(new HttpError(SERVER_ERROR));
  }
  //get expiresIn date
  const expiresIn = user?.expiresIn;
  const newExpirationDate = addMonthFunction(expiresIn!);

  //update expiration date in db
  try {
    const response = await UserSchema.updateOne(
      { _id: id },
      { expiresIn: newExpirationDate }
    );
    if (response.n === 0) {
      const response: ResponseInterface = {
        error: true,
        statusCode: INVALID_ID.code,
        message: INVALID_ID.message,
      };
      return res.status(INVALID_ID.code).json(response);
    }
  } catch (err) {
    logger.error(err.message);
    return next(new HttpError(SERVER_ERROR));
  }
  //respond with success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    message: SUCCESS.message,
    error: false,
  };
  return res.status(SUCCESS.code).json(response);
};
