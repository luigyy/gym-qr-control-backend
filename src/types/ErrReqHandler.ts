import HttpError from "../exceptions/HttpException";
import { Request, Response } from "express";

type ErrReqHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: (err?: HttpError) => void
) => void;

export default ErrReqHandler;
