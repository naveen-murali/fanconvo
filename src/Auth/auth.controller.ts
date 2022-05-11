import { User } from '../Models';
import { SignupBodyModel } from './schema/signup.schema';

export const signupController = async (userInfo: SignupBodyModel) => {

    return await User.create(userInfo);

};
