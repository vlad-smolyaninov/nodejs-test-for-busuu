import {model, Schema} from "mongoose";
import {UserEntity} from "../../domain/user/user.entity";

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: false,
        versionKey: false
    }
);

const UserModel = model<UserEntity>("users", UserSchema)

export default UserModel