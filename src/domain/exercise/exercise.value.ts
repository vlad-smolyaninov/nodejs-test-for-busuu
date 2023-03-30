import {ExerciseEntity} from "./exercise.entity";

export class ExerciseValue implements ExerciseEntity {
    user_id: string;
    content: string;

    constructor({user_id, content}: { user_id: string; content: string }) {
        this.user_id = user_id;
        this.content = content;
    }
}