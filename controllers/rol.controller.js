const db = require("../models");

exports.principal = (req, res) => {
  db.Rol.findAll({
    attributes: ["id", "nombre", "codigo"],
    where: { eliminado: false },
    order: [
      ["nombre", "DESC"],
      ["codigo", "ASC"],
    ],
  })
    .then((registros) => {
      res.status(200).send({ mensaje: "Todos los registros", registros });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error en acceso a base de datos",
        error: err.errors[0].message,
      });
    });
};

exports.buscar = (req, res) => {
  const key = req.params.key;
  const value = req.params.value;

  db.Rol.findAll({
    attributes: ["id", "nombre", "codigo"],
    where: {
      [key]: value,
      eliminado: false,
    },
    order: [
      ["nombre", "DESC"],
      ["codigo", "ASC"],
    ],
  })
    .then((registros) => {
      res.status(200).send({ mensaje: "Todos los registros", registros });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error al acceder a la base de datos",
        error: err.errors[0].message,
      });
    });
};

exports.registro = (req, res) => {
  const nuevoRegistro = {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
  };

  db.Rol.create(nuevoRegistro)
    .then((registro) => {
      res
        .status(200)
        .send({ mensaje: "Registro ingresado correctamente", registro });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          mensaje: "El registro no se pudo ingresar",
          error: err.errors[0].message,
        });
    });
};

exports.editar = (req, res) => {
  procesarEdicion(req, res);
};

exports.eliminar = (req, res) => {
  req.body.eliminar = true;
  procesarEdicion(req, res);
};

// Auxiliar
const procesarEdicion = (req, res) => {
  let registroActualizar = {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
  };

  // Verificar si es eliminar
  if (req.body.eliminar) {
    registroActualizar = {
      eliminado: true,
    };
  }

  const Id = req.body.id;

  db.Rol.update(registroActualizar, {
    where: { id: Id },
  })
    .then((registro) => {
      if (registro == 1) {
        res.status(200).send({ mensaje: "Registro Actualizado" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ mensaje: "Actualizar falló", error: err.errors[0].message });
    });
};
