//TODO: for request missing data, send usage in response
import ReqHandler from "../types/ReqHandler";
import ResponseInterface from "../interfaces/ResponseInterface";
import UserInterface from "../interfaces/UserInterface";
import codes from "../statusCodes";
import HttpError from "../exceptions/HttpException";
import User from "../models/UserModel";
import logger from "../config/logging";
import signToken from "../functions/signToken";
import { isValidObjectId } from "mongoose";

const {
  MISSING_DATA,
  EMAIL_UNAVAILABLE,
  INVALID_PASSWORD,
  INVALID_EMAIL,
  SUCCESS,
  SERVER_ERROR,
  INVALID_ID,
  MEMBERSHIP_EXPIRED,
} = codes;

//POST routes

export const postRegister: ReqHandler = async (req, res, next) => {
  //POST /register

  //get data from request
  const { name, lastName, email }: UserInterface = req.body;

  //check if all the data is provided
  if (!(name && lastName && email)) {
    const fieldsRequired = ["name", "lastName", "email"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  //check if email already exists
  try {
    const result = await User.findOne({ email: email });
    if (result) {
      return next(new HttpError(EMAIL_UNAVAILABLE));
    }
  } catch (err) {
    logger.error("Error when getting user from database");
    return next(new HttpError(SERVER_ERROR));
  }

  //create user
  const newUser = new User({
    name,
    lastName,
    email,
  });

  //save user
  try {
    await newUser.save();
  } catch (err) {
    //TODO: send user more explicit error
    logger.error(err.message);
    logger.error("Error when saving user to database");
    return next(new HttpError(SERVER_ERROR));
  }

  //success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: "User registered succesfully",
  };
  return res.status(SUCCESS.code).send(response);
};

export const postLogin: ReqHandler = async (req, res, next) => {
  //POST /login

  //get data from request
  const { email, password }: UserInterface = req.body;

  //check if data is provided
  if (!(email && password)) {
    const fieldsRequired = ["email", "password"];
    return next(new HttpError(MISSING_DATA, fieldsRequired));
  }

  let user: UserInterface | null = null;
  let isMatch: boolean = false;

  //get user
  try {
    user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError(INVALID_EMAIL));
    }
  } catch {
    logger.error("Error when retrieving user from database");
    return next(new HttpError(SERVER_ERROR));
  }

  //check password
  try {
    isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return next(new HttpError(INVALID_PASSWORD));
    }
  } catch {
    logger.error("Error when comparing passwords");
    return next(new HttpError(SERVER_ERROR));
  }

  //create token
  const token = signToken(user._id, user.name, user.email);

  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: "Login succesfully",
    data: {
      token: token,
    },
  };

  res.status(SUCCESS.code).json(response);
};

export const checkToken: ReqHandler = (_, res, __) => {
  //in routes, checkToken middleware is fired before this middleware,
  //if it make it to here means token was valid.
  const response: ResponseInterface = {
    error: false,
    statusCode: SUCCESS.code,
    message: "Valid token",
  };
  res.status(SUCCESS.code).json(response);
};

export const validateqr: ReqHandler = async (req, res, next) => {
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
    user = await User.findOne({ _id: id }, { expiresIn: 1 });
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

  //check if memebership is inactive
  const today = new Date();
  if (!user.expiresIn || today > user.expiresIn) {
    const response: ResponseInterface = {
      statusCode: MEMBERSHIP_EXPIRED.code,
      message: MEMBERSHIP_EXPIRED.message,
      error: true,
    };
    return res.status(MEMBERSHIP_EXPIRED.code).json(response);
  }
  //respond with success
  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    message: SUCCESS.message,
    error: false,
  };
  return res.status(SUCCESS.code).json(response);
};
