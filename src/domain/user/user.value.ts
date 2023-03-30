import {UserEntity} from "./user.entity";

export class UserValue implements UserEntity {
    name: string;
    email: string;

    constructor({name, email}: { name: string; email: string }) {
        this.name = name;
        this.email = email;
    }
}