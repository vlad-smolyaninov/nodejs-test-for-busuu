import {UserEntity} from "./user.entity";

export interface IUserRepository {
    findUserById(_id: string): Promise<UserEntity | null>;

    countUsersByEmail(email: string): Promise<number>;

    registerUser(user: UserEntity): Promise<UserEntity | null>;

    listUser(): Promise<UserEntity[] | null>;
}