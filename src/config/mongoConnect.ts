import logger from './logging';
import config from './config'; 
import mongoose from 'mongoose';

const mongoConnect = () => {

  //connect to database
  mongoose.connect(config.mongo.url_localhost, config.mongo.options)
  .catch((err: any) =>  {
    logger.error('Error when connecting to database');
    throw new Error(err.message);
  })

  mongoose.set('useCreateIndex', true);

  // when successfully connected
  mongoose.connection.on('connected', function () {  
    logger.info('Successfully connected to database');
  }); 

  // if the connection throws an error
  mongoose.connection.on('error', function (err: any) {  
    logger.warn('Mongoose default connection error: ' + err);
  }); 
  // when the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    logger.warn('Mongoose default connection disconnected'); 
  });

  // if the node process ends, close the mongoose connection 
  process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      logger.warn('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 
};

export default mongoConnect;
