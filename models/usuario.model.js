const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
  return Usuario;
};
