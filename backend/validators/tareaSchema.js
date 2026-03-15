const Joi = require("joi");

const tareaSchema = Joi.object({
    titulo: Joi.string().min(1).max(200).required(),
    completado: Joi.boolean().optional(),
    fechaCreacion: Joi.date().optional()
});

const tareaOpcionalSchema = Joi.object({
    titulo: Joi.string().min(1).max(200).optional(),
    completado: Joi.boolean().optional(),
    fechaCreacion: Joi.date().optional()
}).min(1);

module.exports = {
    tareaSchema,
    tareaOpcionalSchema
};