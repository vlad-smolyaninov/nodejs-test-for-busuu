import * as dotenv from 'dotenv'
import express from "express";
import cors from "express";
import routes from "./infrastructure/routes";
import dbInit from "./infrastructure/db/mongo";
import globalErrorHandler from "./infrastructure/middlewares/global_error_handler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8888;

app.use(routes);
app.use(globalErrorHandler)

dbInit().then();
app.listen(port, () => console.log(`APP, run on PORT: ${port}`));