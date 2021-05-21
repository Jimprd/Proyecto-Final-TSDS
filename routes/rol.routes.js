const RolRoutes = require('express').Router();
const Ctrl = require('../controllers/rol.controller')

RolRoutes.get('/', Ctrl.principal);
RolRoutes.get('/buscar/:key/:value', Ctrl.buscar);
RolRoutes.post('/registro', Ctrl.registro);
RolRoutes.put('/editar', Ctrl.editar);

// no se elimina el registro, se pasa a true el campo Eliminado
RolRoutes.delete('/eliminar', Ctrl.eliminar);

module.exports = RolRoutes;