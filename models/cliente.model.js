const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define(
    "Cliente",
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      eliminado: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: false,
      },
    },
    {}
  );
  return Cliente;
};