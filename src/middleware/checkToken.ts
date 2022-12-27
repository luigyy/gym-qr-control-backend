import ReqHandler from '../types/ReqHandler';
import HttpError from '../exceptions/HttpException';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import signToken from '../functions/signToken'; 
import codeFor from '../statusCodes';

const secret = config.server.token.secret;

const { 
  MISSING_TOKEN,
  INVALID_TOKEN,
} = codeFor;

//middleware mainly used for securing private, routes. 
//Also has an used in /routes/authenticationController for validating token
//if user already has one in route /checkToken.
const checkToken: ReqHandler = (req, res, next) => {

 //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  if (!token) return next(new HttpError(MISSING_TOKEN));

  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, secret);
    res.locals.jwtPayload = jwtPayload;

  } catch (error) {
    return next(new HttpError(INVALID_TOKEN));
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { id, name, email } = jwtPayload;
  const newToken = signToken(id, name, email);

  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();

};

export default checkToken;
