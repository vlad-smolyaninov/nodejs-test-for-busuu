import { ValidationError } from 'ajv';
import {IUserRepository} from "../../src/domain/user/user.Interface";
import {UserUseCase} from "../../src/application/use_case/user.use_case";

describe('UserUseCase', () => {
  const userRepository: IUserRepository = {
    registerUser: jest.fn(),
    findUserById: jest.fn(),
    countUsersByEmail: jest.fn(),
    listUser: jest.fn(),
  };

  const userUseCase = new UserUseCase(userRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if the email already exists', async () => {
    (userRepository.countUsersByEmail as jest.Mock).mockResolvedValue(1);

    await expect(userUseCase.registerUser({ name: 'John Doe', email: 'john@example.com' })).rejects.toThrowError(ValidationError);
    expect(userRepository.countUsersByEmail).toHaveBeenCalledWith('john@example.com');
  });

  it('should register a new user', async () => {
    (userRepository.countUsersByEmail as jest.Mock).mockResolvedValue(0);
    (userRepository.registerUser as jest.Mock).mockResolvedValue({ id: 'user_id', name: 'John Doe', email: 'john@example.com' });

    const result = await userUseCase.registerUser({ name: 'John Doe', email: 'john@example.com' });

    expect(result).toEqual({ id: 'user_id', name: 'John Doe', email: 'john@example.com' });
    expect(userRepository.registerUser).toHaveBeenCalled();
  });
});

