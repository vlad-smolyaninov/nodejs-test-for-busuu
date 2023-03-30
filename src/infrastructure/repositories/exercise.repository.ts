import {ExerciseEntity} from "../../domain/exercise/exercise.entity";
import {IExerciseRepository} from "../../domain/exercise/exercise.Interface";
import ExerciseModel from "../models/exercise.schema";

export class ExerciseRepository implements IExerciseRepository {

    async createExercise(exerciseData: ExerciseEntity): Promise<ExerciseEntity> {
        const exercise  = await ExerciseModel.create(exerciseData)
        return  exercise.toObject() as ExerciseEntity;
    }

    async listExercise() {
        const exercises = await ExerciseModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    content: 1,
                    created_at: 1,
                    'user.name': 1,
                },
            }
        ]);
        return exercises
    }

    async countExercisesByUserId(user_id: string) {
        const exercises = await ExerciseModel.count({user_id})
        return exercises
    }
}