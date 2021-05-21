const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Establecimiento = sequelize.define(
    "Establecimiento",
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      eliminado: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: false,
      },
    },
    {}
  );
  return Establecimiento;
};