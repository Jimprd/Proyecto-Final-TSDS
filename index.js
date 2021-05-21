const express = require("express");
const cors = require("cors");

// ENVIRONMENT
require("dotenv").config({ path: "./environment/.env" });

// CORS
const corsOptions = {
  //funciona como firewall a nivel de aplicación
  origin: ["https://localhost:4000", "http://localhost"],
  // origin: ["https://www.mipagina.com.ar", "https://admin.mipagina.com.ar"]
};

// APP
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// MOTOR DB
const db = require("./models");

db.sequelize
  .sync() // {alter: true}
  .then((result) => {
    console.log("DB Sincronizada");
  })
  .catch((err) => {
    console.log("DB Error", err);
  });

// MIDDLEWARE
const auth = require("./middleware/auth");

// RUTAS
// DASH
// require("./routes/");
const UsuarioRoutes = require("./routes/usuario.routes");
const RolRoutes = require("./routes/rol.routes");
const ObraSocialRoutes = require("./routes/obra.social.routes");
app.use("/usuario", UsuarioRoutes);
app.use("/rol", auth, RolRoutes);
app.use("/obrasocial", ObraSocialRoutes)


// PUBLIC
const ClienteRoutes = require("./routes/cliente.routes");
app.use("/cliente", ClienteRoutes);

// SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Escuchando en puerto ", PORT, "\n");
});

console.log("API inició...");
