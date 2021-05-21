const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const ObraSocial = sequelize.define(
    "ObrasSociale",
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
  return ObraSocial;
};