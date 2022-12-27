//set type for errors to custom 'HttpError'

import HttpError from '../exceptions/HttpException';
import { Request, Response} from 'express';

type ReqHandler = (req: Request, res: Response, next:(err?: HttpError) => void) => void;

export default ReqHandler;


