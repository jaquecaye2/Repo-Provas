"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
function validateSchema(schema) {
    return (request, response, next) => {
        const validation = schema.validate(request.body);
        if (validation.error) {
            throw { code: "Unprocessable", message: `Erro nas informações enviadas. Verifique: ${validation.error}` };
        }
        next();
    };
}
exports.validateSchema = validateSchema;
