import {Router} from "express";
import {UserUseCase} from "../../application/use_case/user.use_case";
import {UserController} from "../controllers/user.controller";
import {UserRepository} from "../repositories/user.repository";
import {ExerciseRepository} from "../repositories/exercise.repository";
import {ExerciseUseCase} from "../../application/use_case/exercise.use_case";
import {ExerciseController} from "../controllers/exercise.controller";

const route = Router()

// Init repos
const userRepo = new UserRepository()
const exerciseRepo = new ExerciseRepository()

// Init use cases
const userUseCase = new UserUseCase(userRepo)
const exerciseUseCase = new ExerciseUseCase(exerciseRepo, userRepo)

// Init controllers
const userController = new UserController(userUseCase)
const exerciseController = new ExerciseController(exerciseUseCase)

// Register routes
route.post(`/user`, userController.insertController)
route.get(`/user`, userController.getController)

route.post(`/exercise`, exerciseController.insertController)
route.get(`/exercise`, exerciseController.getController)

export default route