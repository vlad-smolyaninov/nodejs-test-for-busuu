import {NextFunction, Request, Response} from "express";
import {UserUseCase} from "../../application/use_case/user.use_case";
import {validateUser} from "../validator/user.validator";
import {ValidationError} from "ajv";

export class UserController {

    constructor(private userUseCase: UserUseCase) {
        this.insert = this.insert.bind(this)
        this.get = this.get.bind(this)
    }

    public async get({query}: Request, res: Response, next: NextFunction) {
        try {
            const {uuid = ''} = query;
            if (uuid) {
                const user = await this.userUseCase.getDetailUser(`${uuid}`);
                res.send({user});
            }
            const users = await this.userUseCase.getUsers();
            res.send({users});
        } catch (e) {
            next(e)
        }
    }

    public async insert({body}: Request, res: Response, next: NextFunction) {
        try {
            const valid = validateUser(body);
            if (!valid) {
                throw new ValidationError(validateUser.errors || [])
            }
            const users = await this.userUseCase.registerUser(body);
            res.send({body});
        } catch (e) {
            next(e)
        }
    }
}