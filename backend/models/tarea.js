const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Tarea = sequelize.define(
        "Tarea",
        {
            titulo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            completado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            fechaCreacion: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }
    );

    return Tarea;
};