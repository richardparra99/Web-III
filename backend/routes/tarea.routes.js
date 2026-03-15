const { tareaSchema, tareaOpcionalSchema } = require("../validators/tareaSchema.js");
const validateJson = require("../middleware/validation.middleware.js");
const { isJsonRequestValid } = require("../middleware/isJsonRequestValid.middleware.js");
const { getObjectOr404 } = require("../middleware/isObjectOr404.middleware.js");
const db = require("../models");

module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controllers/tarea.controller.js");

    router.get("/", controller.obtenerTodasLasTareas);
    router.get("/:id", getObjectOr404(db.tarea), controller.obtenerTareaPorId);

    router.post("/", isJsonRequestValid, validateJson(tareaSchema), controller.crearTarea);

    router.put("/:id", isJsonRequestValid, validateJson(tareaSchema), getObjectOr404(db.tarea), controller.actualizarTareaCompleta);

    router.patch("/:id", isJsonRequestValid, validateJson(tareaOpcionalSchema), getObjectOr404(db.tarea), controller.actualizarTareaParcial);

    router.delete("/:id", getObjectOr404(db.tarea), controller.eliminarTarea);

    app.use("/tareas", router);
};