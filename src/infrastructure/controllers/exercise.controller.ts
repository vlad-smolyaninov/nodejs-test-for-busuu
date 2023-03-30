import {NextFunction, Request, Response} from "express";
import {ExerciseUseCase} from "../../application/use_case/exercise.use_case";
import {validateExercise} from "../validator/exercise.validator";
import {ValidationError} from "ajv";

export class ExerciseController {
    constructor(private exerciseUseCase: ExerciseUseCase) {
        this.insert = this.insert.bind(this)
        this.get = this.get.bind(this)
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const exercises = await this.exerciseUseCase.getExercises();
            res.send({exercises});
        } catch (e) {
            next(e)
        }
    }

    public async insert({body}: Request, res: Response, next: NextFunction) {
        try {
            const valid = validateExercise(body);
            if (!valid) {
                throw new ValidationError(validateExercise.errors || [])
            }
            const exercises = await this.exerciseUseCase.createExercise(body);
            res.send({exercises});
        } catch (e) {
            next(e)
        }
    }
}