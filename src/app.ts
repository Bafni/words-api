import express, { Express } from "express";
import config from '../src/config/config';
import { morgan } from "./modules/logger";
import helmet from "helmet";
import cors from 'cors'
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import passport from 'passport';
import jwtStrategy from './modules/auth/passport'
import routes from './routes/v1';
import { ApiError, errorConverter, errorHandler } from './modules/errors';
import httpStatus from 'http-status-codes';

const app: Express = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;