import express, {Request, Response, Router} from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import catchAsync from "../../modules/utils/catchAsync";
import httpStatus from "http-status-codes";

const router = express.Router()

interface IRoute {
    path: string;
    route: Router
}

const defaultIRoute: IRoute[] = [
    {
        path: '/ping',
        route: router.get('/', catchAsync(async (req: Request, resp: Response) => resp.status(httpStatus.OK).send('pong')))
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute
    }
]
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;