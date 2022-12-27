import ReqHandler from "../types/ReqHandler";
import User from "../models/UserModel";
import HttpError from "../exceptions/HttpException";
import codeFor from "../statusCodes";
import ResponseInterface from "../interfaces/ResponseInterface";

const { SERVER_ERROR, SUCCESS } = codeFor;

export const getUsers: ReqHandler = async (_, res, next) => {
  //get users from database
  let users;
  try {
    users = await User.find({});
    if (!users) {
      return next(new HttpError(SERVER_ERROR));
    }
  } catch {
    return next(new HttpError(SERVER_ERROR));
  }

  const response: ResponseInterface = {
    statusCode: SUCCESS.code,
    error: false,
    message: "Users retrieve from database successfully",
    data: {
      userData: users,
    },
  };

  res.status(SUCCESS.code).json(response);
};
