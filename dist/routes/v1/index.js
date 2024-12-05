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
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const catchAsync_1 = __importDefault(require("../../modules/utils/catchAsync"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router = express_1.default.Router();
const defaultIRoute = [
    {
        path: '/ping',
        route: router.get('/', (0, catchAsync_1.default)((req, resp) => __awaiter(void 0, void 0, void 0, function* () { return resp.status(http_status_codes_1.default.OK).send('pong'); })))
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/users',
        route: user_route_1.default
    }
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
