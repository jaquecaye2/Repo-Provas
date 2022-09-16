"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const index_1 = __importDefault(require("./routers/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.default);
app.use(errorHandler_1.default);
const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
