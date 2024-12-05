"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const index_1 = require("../errors/index");
const registerUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isEmailTaken(userBody.email)) {
        throw new index_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'Email already taken');
    }
    return user_model_1.default.create(userBody);
});
exports.registerUser = registerUser;
