import { Schema, model, Document, CallbackWithoutResultAndOptionalError } from 'mongoose';
import { hash, genSalt } from 'bcrypt';
import { UserModel } from './schema';
import { Models, RoleTypes } from './entitiy';


const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "firstName is required"],
        },
        lastName: {
            type: String,
            required: [true, "lastName is required"]
        },
        username: {
            type: String,
            unique: true,
            required: [true, "username is required"]
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, 'email is required'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        timezone: {
            type: String,
            required: [true, "timezone is required"]
        },
        role: {
            type: String,
            enum: {
                values: [RoleTypes.FAN, RoleTypes.TALENT],
                message: '{VALUE} is not supported'
            }
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);


UserSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password')) next();

    let salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});


export const User = model<UserModel & Document>(Models.USER, UserSchema);
