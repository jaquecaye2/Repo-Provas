import cors from "cors";
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import router from "./routers/index"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorHandler);

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
