import {IExerciseRepository} from '../../domain/exercise/exercise.Interface';
import {ExerciseValue} from '../../domain/exercise/exercise.value';
import {ValidationError} from "ajv";
import {IUserRepository} from "../../domain/user/user.Interface";
import {ExerciseEntity} from "../../domain/exercise/exercise.entity";

export const MAX_EXERCISES_PER_USER = 10

export class ExerciseUseCase {
    constructor(private readonly exerciseRepository: IExerciseRepository, private readonly userRepository: IUserRepository) {
    }

    public createExercise = async ({user_id, content}: ExerciseEntity) => {

        const user = await this.userRepository.findUserById(user_id);

        if (!user) {
            const error = new ValidationError([]);
            error.message = 'User not found';
            throw error;
        }

        const exercisesOfUser = await this.getCountExercisesByUserId(user_id)
        const isUserReachedLimit = Number(exercisesOfUser) >= MAX_EXERCISES_PER_USER

        if (isUserReachedLimit) {
            const error = new ValidationError([])
            error.message = 'Exercises limit has been reached'
            throw error
        }
        const exerciseValue = new ExerciseValue({user_id, content});

        const exerciseCreated = await this.exerciseRepository.createExercise(exerciseValue);
        return exerciseCreated;
    };

    public getCountExercisesByUserId = async (user_id: string) => {
        const exercise = await this.exerciseRepository.countExercisesByUserId(user_id);
        return exercise;
    };

    public getExercises = async () => {
        const exercises = await this.exerciseRepository.listExercise();
        return exercises;
    };

}
