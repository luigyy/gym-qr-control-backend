import nodeCache from 'node-cache';
import HttpError from '../exceptions/HttpException';
import { Request, Response } from 'express';

const cacheOptions: any = { //get from env
  stdTLL: 100,
  checkperiod: 600, //default 600, in seconds
  maxKeys: -1, //default -1, unlimited keys
}

const myCache = new nodeCache(cacheOptions); 

const cache = (duration: number) => { //time in seconds
  return (req: Request, res: Response, next: (err?: HttpError) => void) => {

    const key = '__express__' + req.originalUrl;
    const cachedBody = myCache.get(key);
    
    if(cachedBody) {
      res.send(cachedBody); 
    }else {
      //not cached yet
      let ress = res.send;
      res.send = (body: any) => {
        ress(body); 
      };
    }
  
  };
};

export default cache;
