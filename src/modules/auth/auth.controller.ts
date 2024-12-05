import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { userService } from '../user';
import { tokenService } from '../token';

export const register = catchAsync(async (req: Request, resp: Response) => {
    console.log('req', req)
    const user = await userService.registerUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    resp.status(httpStatus.CREATED).send({ user, tokens});
});