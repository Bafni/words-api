"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../errors");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, utils_1.pick)(schema, ['params', 'query', 'body']);
    const object = (0, utils_1.pick)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new errors_1.ApiError(http_status_codes_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
