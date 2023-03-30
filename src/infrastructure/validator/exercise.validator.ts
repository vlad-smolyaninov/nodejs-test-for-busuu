import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv)

interface Exercise {
  content: string;
  user_id: string;
}

const exerciseSchema: JSONSchemaType<Exercise> = {
  type: 'object',
  properties: {
    content: { type: 'string', maxLength: 100 },
    user_id: { type: 'string', pattern: '^[a-f\\d]{24}$' },
  },
  required: ['content', 'user_id'],
  additionalProperties: false,
};

const validateExercise = ajv.compile(exerciseSchema);

export { validateExercise };
