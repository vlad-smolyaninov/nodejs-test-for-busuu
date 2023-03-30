import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv)

interface User {
  name: string;
  email: string;
}

const userSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

const validateUser = ajv.compile(userSchema);

export { validateUser };
