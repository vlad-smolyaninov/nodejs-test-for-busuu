import {ExerciseEntity} from "./exercise.entity";

export interface IExerciseRepository {
    countExercisesByUserId(uuid: string): Promise<ExerciseEntity | null>;
    createExercise(user: ExerciseEntity): Promise<ExerciseEntity | null>;
    listExercise(): Promise<ExerciseEntity[] | null>;
}