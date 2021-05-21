const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config({ path: "../environment/.env" });

exports.registro = async (req, res) => {
  const passEncriptado = await bcrypt.hash(req.body.password, 12); // significa que hace 12 pasadas en la encriptación

  const rolBase = await db.Rol.findOne({
    where: { codigo: "USR" },
  });

  const nuevoUsuario = {
    email: req.body.email,
    password: passEncriptado,
    RolId: rolBase.id,
  };

  console.log("RECIBIDOS", nuevoUsuario);

  db.Usuario.create(nuevoUsuario)
    .then((registro) => {
      res.status(200).send({
        mensaje: "Registro OK",
        registro: registro,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "El registro no se pudo ingresar",
        error: err.errors[0].message,
      });
    });
};

exports.login = async (req, res) => {
  const usuario = await db.Usuario.findOne({
    where: { email: req.body.email },
  });
  if (usuario) {
    if (bcrypt.compareSync(req.body.password, usuario.password)) {
      // Login correcto. Crear token
      const token = jwt.sign(
        // todo esto es lo que nosotros queremos que encripte el token. evitar contraseñas
        {
          id: usuario.id,
          email: req.body.email,
          rolId: usuario.RolId,
        },
        process.env.SECRET_JWT,
        {
          expiresIn: "8h",
        }
      );
      const data = {
        token: token,
        id: usuario.id,
        email: req.body.email,
        rolId: usuario.RolId,
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
  db.Usuario.findAll({
    attibuttes: ["id", "email"],
    include: [
      {
        model: db.Rol,
        attributes: ["id", "nombre", "codigo"],
      },
    ],
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

  db.Usuario.findAll({
    attributes: ["id", "nombre", "apellido"],
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
  procesarEditar(req, res);
};

exports.eliminar = (req, res) => {
  req.body.eliminar = true;
  procesarEditar(req, res);
};

// Auxiliar
const procesarEditar = (req, res) => {
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

  db.Usuario.update(registroActualizar, {
    where:{id: id}
  })
    .then((registro) => {
      if (registro == 1) {
        res.status(200).send({ msg: "Registro Actualizado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error al conectar con la DB",
        error: err.errors[0].message,
      });
    });
};
