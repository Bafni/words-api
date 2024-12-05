"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../src/config/config"));
const logger_1 = require("./modules/logger");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./modules/auth/passport"));
const v1_1 = __importDefault(require("./routes/v1"));
const errors_1 = require("./modules/errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const app = (0, express_1.default)();
if (config_1.default.env !== 'test') {
    app.use(logger_1.morgan.successHandler);
    app.use(logger_1.morgan.errorHandler);
}
// set security HTTP headers
app.use((0, helmet_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// sanitize request data
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use('jwt', passport_2.default);
// v1 api routes
app.use('/v1', v1_1.default);
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError(http_status_codes_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errors_1.errorConverter);
// handle error
app.use(errors_1.errorHandler);
exports.default = app;
