import {ValidationError} from "ajv";
import {NextFunction, Request, Response} from "express";

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message })
      return
    }

    res.status(500)
    res.send({error})
}