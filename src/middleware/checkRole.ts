import { Request, Response } from "express";
import ResponseInterface from "../interfaces/ResponseInterface";
import HttpError from "../exceptions/HttpException";
import User from "../models/UserModel";
import codeFor from "../statusCodes";

const { SERVER_ERROR, UNAUTHORIZED, INVALID_TOKEN } = codeFor;

const checkRole = (roles: Array<"ADMIN" | "USER">) => {
  return async (_: Request, res: Response, next: (err?: HttpError) => void) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.id;

    //Get user role from the database
    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return next(new HttpError(INVALID_TOKEN));
      }

      //Check if array of authorized roles includes the user's role
      if (!(roles.indexOf(user.role) > -1)) {
        //does not include, send error
        const response: ResponseInterface = {
          statusCode: UNAUTHORIZED.code,
          error: true,
          message: UNAUTHORIZED.message,
        };

        return res.status(UNAUTHORIZED.code).send(response);
      }
      return next();
    } catch {
      return next(new HttpError(SERVER_ERROR));
    }
  };
};

export default checkRole;
