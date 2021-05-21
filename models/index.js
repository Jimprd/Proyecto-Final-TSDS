// Acceso al motor DB
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');
// const dbConfig = require('../config/db.server.config');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port,
        // Ocultar logs en consola
        // logging: false  
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELOS BASE
db.Usuario = require('./usuario.model')(sequelize, Sequelize);
db.Cliente = require('./cliente.model')(sequelize, Sequelize);
db.Rol = require('./rol.model')(sequelize,Sequelize);
db.ObraSocial = require('./obra.social.model')(sequelize,Sequelize);
db.Establecimiento = require('./establecimiento.model')(sequelize,Sequelize);

// RELACIONES
db.Rol.hasMany(db.Usuario);
db.Usuario.belongsTo(db.Rol);



module.exports = db;