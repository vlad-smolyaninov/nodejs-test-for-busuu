import { ExerciseUseCase, MAX_EXERCISES_PER_USER } from '../../src/application/use_case/exercise.use_case';
import { IExerciseRepository } from '../../src/domain/exercise/exercise.Interface';
import { IUserRepository } from '../../src/domain/user/user.Interface';
import { ValidationError } from 'ajv';

describe('ExerciseUseCase', () => {
  const exerciseRepository: IExerciseRepository = {
    createExercise: jest.fn(),
    countExercisesByUserId: jest.fn(),
    listExercise: jest.fn(),
  };

  const userRepository: IUserRepository = {
    registerUser: jest.fn(),
    findUserById: jest.fn(),
    listUser: jest.fn(),
    countUsersByEmail: jest.fn(),
  };

  const exerciseUseCase = new ExerciseUseCase(exerciseRepository, userRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ValidationError when user is not found', async () => {
    jest.spyOn(userRepository, 'findUserById').mockResolvedValueOnce(null);

    await expect(
      exerciseUseCase.createExercise({ user_id: 'non-existing-user', content: 'test content' }),
    ).rejects.toThrow(ValidationError);
  });

  it('should throw an error if the user reached the maximum exercises limit', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue({ id: 'user_id' });
    (exerciseRepository.countExercisesByUserId as jest.Mock).mockResolvedValue(MAX_EXERCISES_PER_USER);

    await expect(exerciseUseCase.createExercise({ user_id: 'user_id', content: 'test' })).rejects.toThrowError(ValidationError);
    expect(exerciseRepository.countExercisesByUserId).toHaveBeenCalledWith('user_id');
  });

  it('should create a new exercise', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue({ id: 'user_id' });
    (exerciseRepository.countExercisesByUserId as jest.Mock).mockResolvedValue(MAX_EXERCISES_PER_USER - 1);
    (exerciseRepository.createExercise as jest.Mock).mockResolvedValue({ id: 'exercise_id', user_id: 'user_id', content: 'test' });

    const result = await exerciseUseCase.createExercise({ user_id: 'user_id', content: 'test' });

    expect(result).toEqual({ id: 'exercise_id', user_id: 'user_id', content: 'test' });
    expect(exerciseRepository.createExercise).toHaveBeenCalled();
  });
});
