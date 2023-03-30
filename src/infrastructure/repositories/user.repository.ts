import {UserEntity} from "../../domain/user/user.entity";
import {IUserRepository} from "../../domain/user/user.Interface";
import UserModel from "../models/user.schema";

export class UserRepository implements IUserRepository {
    async findUserById(_id: string): Promise<any> {
        const user = await UserModel.findById(_id)
        return user
    }

    async countUsersByEmail(email: string): Promise<any> {
        const user = await UserModel.count({email})
        return user
    }

    async registerUser(userEntity: UserEntity): Promise<any> {
        const user = await UserModel.create(userEntity)
        return user
    }

    async listUser(): Promise<any> {
        const users = await UserModel.find()
        return users
    }
}