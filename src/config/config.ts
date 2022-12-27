import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: true
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'supersecretpassword1';
const MONGO_HOST = process.env.MONGO_URL || `cluster0.menvh.mongodb.net/sample?w=majority`;

const MONGO_LOCALHOST_DB_NAME = process.env.DB_NAME || 'authenticationAPI';
const MONGO_LOCALHOST_PORT = process.env.DB_PORT || '27017';
const MONGO_LOCALHOST_URL = `mongodb://localhost:${MONGO_LOCALHOST_PORT}/${MONGO_LOCALHOST_DB_NAME}`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    url_localhost: MONGO_LOCALHOST_URL
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

//token
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 60 * 60 * 2 // '2h' can also be used
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'defaultAPI';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'defaultsecret';
const SERVER_TOKEN_ALGORITHM = (process.env.SERVER_TOKEN_ALGORITHM as Algorithm) || 'HS256';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        algorithm: SERVER_TOKEN_ALGORITHM,
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;

