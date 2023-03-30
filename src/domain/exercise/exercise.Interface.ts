import {ExerciseEntity} from "./exercise.entity";

export interface IExerciseRepository {
    countExercisesByUserId(uuid: string): Promise<number>;

    createExercise(exercise: ExerciseEntity): Promise<ExerciseEntity | null>;

    listExercise(): Promise<ExerciseEntity[] | null>;
}