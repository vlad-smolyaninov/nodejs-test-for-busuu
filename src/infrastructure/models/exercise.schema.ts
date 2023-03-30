import {model, Schema} from "mongoose";

const ExerciseSchema = new Schema(
    {
        createdAt: {
            type: Number,
        },
        content: {
            type: String,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        created_at: {
            type: Date
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
        versionKey: false,
    }
);

const ExerciseModel = model("exercises", ExerciseSchema)

export default ExerciseModel