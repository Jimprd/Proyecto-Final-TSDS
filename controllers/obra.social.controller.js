const db = require("../models");

exports.registro = (req, res) => {
  const { nombre, descripcion } = req.body;

  const nuevoRegistro = {
    nombre: nombre,
    descripcion: descripcion,
  };

  db.ObraSocial.create(nuevoRegistro)
    .then((registro) => {
      res.status(200).send({
        msg: "Registro OK",
        registro,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error al acceder a DB", 
        error: err.errors[0].message,
      });
    });
};

exports.principal = (req, res) => {
 db.ObraSocial.findAll({
  attributes: ["id", "nombre", "descripcion"],
  order: [
    ["nombre", "DESC"],
  ],
 }).then((registros) => {
  res.status(200).send({
    msg: "Registros",
    registros
  })
 }).catch((err)=> {
    msg: "Error al acceder",
    err
 });
}