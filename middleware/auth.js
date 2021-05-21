const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../environment/.env" }); 


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error("No Authorization code");
    error.statusCode = 401;
    throw error;
  }
  // Cabecera identificada, obtener token
  // Asi viene en la cabecera, hay que quitar el espacio:
  // "Bearer <token>"
  const token = authHeader.split(" ")[1];
  let verificarToken;

  try {                                 
    verificarToken = jwt.verify(token, process.env.SECRET_JWT); // obtenemos el JSON con los datos encriptados
    req.usuarioLogueado = verificarToken;
  } catch (error) {
      error.statusCode = 401;
      throw error;
  }
  next();
};
