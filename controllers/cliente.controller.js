const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config({ path: "../environment/.env" });

exports.registro = async (req, res) => {
  const { email, password } = req.body;

  const passEncriptado = await bcrypt.hash(password, 12);

  const nuevoCliente = {
    email: email,
    password: passEncriptado,
  };

  db.Cliente.create(nuevoCliente)
    .then((registro) => {
      res.status(200).send({
        meg: "Registro OK",
        registro,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "El registro no se pudo crear",
        error: err.errors[0].message,
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const cliente = await db.Cliente.findOne({
    where: { email: email },
  });

  if (cliente) {
    if (bcrypt.compareSync(password, cliente.password)) {
      const token = jwt.sign(
        //Encriptamos: NO CONTRASEÑAS o info sensible
        {
          id: cliente.id,
          email: email,
        },
        process.env.SECRET_JWT,
        {
          expiresIn: "8h",
        }
      );

      const data = {
        token: token,
        id: cliente.id,
        email: email,
      };

      res.status(200).send({ msg: "Loguin OK", data });
    } else {
      // contraseña incorrecta
      res.status(500).send({
        msg: "Error en login, COD: 002",
      });
    }
  } else {
    // no existe el email en la DB
    res.status(500).send({
      msg: "Error en login, COD: 001",
    });
  }
};

exports.principal = (req, res) => {
  db.Cliente.findAll({
    attibuttes: ["id", "email"],
  })
    .then((registros) => {
      res.status(200).send({ msg: "Registros", registros });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error al recuperar registros",
        err,
      });
    });
};

exports.buscar = (req, res) => {
  const { key, value } = req.params;

  db.Cliente.findAll({
    attibutes: ["id", "nombre", "apellido", "email"],
    where: {
      [key]: value,
    },
  })
    .then((registros) => {
      res.status(200).send({ msg: "Registros que coinciden", registros });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error al acceder a la base de datos",
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

//Auxiliar
const procesarEdicion = (req, res) => {
  const { id, nombre, apellido, eliminar } = req.body;

  let registroActualizar = {
    nombre: nombre,
    apellido: apellido,
  };

  if (eliminar) {
    registroActualizar = {
      eliminado: true,
    };
  }

  db.Cliente.update(registroActualizar, {
    where: { id: id },
  })
    .then((registro) => {
      if (registro == 1) {
        res.status(200).send({ msg: "Registro Actualizado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "No se pudo actualizar",
        error: err.errors[0].message,
      });
    });
};
