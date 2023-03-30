import {IUserRepository} from '../../domain/user/user.Interface';
import {UserValue} from '../../domain/user/user.value';
import {ValidationError} from "ajv";

export class UserUseCase {
    constructor(private readonly userRepository: IUserRepository) {
    }

    public registerUser = async ({name, email}: any) => {
        const isEmailExists = await this.getCountUserByEmail(email)
        if (isEmailExists) {
            const error = new ValidationError([])
            error.message= 'Email already exists'
            throw error
        }
        const userValue = new UserValue({name, email});

        const user = await this.userRepository.registerUser(userValue);
        return user;
    };

    public getDetailUser = async (id: string) => {
        const user = await this.userRepository.findUserById(id);
        return user;
    };

    public getCountUserByEmail = async (email: string) => {
        const user = await this.userRepository.countUsersByEmail(email);
        return user;
    };

    public getUsers = async () => {
        const users = await this.userRepository.listUser();
        return users;
    };

}
