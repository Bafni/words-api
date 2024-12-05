import { NewCreatedUser, IUserDoc } from './user.interfaces';
import User from './user.model';
import httpStatus from 'http-status-codes';
import { ApiError } from '../errors/index';

export const registerUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
}