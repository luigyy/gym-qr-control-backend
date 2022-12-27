//added custom HttpError class as error type for next function
import { Request, Response } from 'express';
import HttpError from '../exceptions/HttpException';

export interface ReqHandlerInterface {
  (req: Request, res: Response, next?: (err: HttpError) => void): void; 
};

export interface ErrorReqHandlerInterface {
  (err: HttpError, req: Request, res: Response): void; 
}
