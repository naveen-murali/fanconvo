import { RoleTypes } from '../entitiy/auth.entity';

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    timezone: string;
    role: RoleTypes;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}