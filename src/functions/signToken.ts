import PayloadInterface from '../interfaces/payload';
import TokenOptionsInterface from '../interfaces/tokenOptions';

import { ObjectId } from 'mongoose';
import config from '../config/config';
import jwt, { Algorithm } from 'jsonwebtoken';


const secret: string = config.server.token.secret;
const algorithm: Algorithm = config.server.token.algorithm;
const issuer: string = config.server.token.issuer;
const expiresIn: string | number = config.server.token.expireTime;


const tokenOptions: TokenOptionsInterface = {
  algorithm: algorithm,
  expiresIn: expiresIn,
  issuer: issuer
}


const signToken = (id: ObjectId, name: string, email: string): string => {

  //create token
  const payload: PayloadInterface = {
    id,
    name,
    email
  }
  const token = jwt.sign(payload, secret, tokenOptions)

  return token;
};

export default signToken;
