import {model, Schema} from "mongoose";

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

const UserModel = model("users", UserSchema)

export default UserModel