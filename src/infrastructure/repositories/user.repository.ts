import {UserEntity} from "../../domain/user/user.entity";
import {IUserRepository} from "../../domain/user/user.Interface";
import UserModel from "../models/user.schema";

export class UserRepository implements IUserRepository {
    async findUserById(_id: string) {
        const user = await UserModel.findById(_id)
        return user
    }

    async countUsersByEmail(email: string) {
        const userCount = await UserModel.count({email})
        return userCount
    }

    async registerUser(userEntity: UserEntity) {
        const user = await UserModel.create(userEntity)
        return user
    }

    async listUser() {
        const users = await UserModel.find()
        return users
    }
}