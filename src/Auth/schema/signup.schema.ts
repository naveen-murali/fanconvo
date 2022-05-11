import { UserModel } from '../../Models';

export interface SignupBodyModel extends Omit<UserModel, "_id" | "createdAt" | "updatedAt"> { }