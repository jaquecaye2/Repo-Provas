import joi from "joi";
import { TypeTestData } from "../types/testTypes";

const testSchema = joi.object<TypeTestData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().integer().required(),
  teacherDisciplineId: joi.number().integer().required()
});

export default testSchema;
