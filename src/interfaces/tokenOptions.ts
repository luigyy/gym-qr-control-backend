import { Algorithm } from 'jsonwebtoken';

interface TokenOptionsInterface {
  algorithm: Algorithm;
  expiresIn: string | number;
  issuer: string;
}

export default TokenOptionsInterface;
