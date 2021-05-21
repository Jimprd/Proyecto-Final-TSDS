const RouterEstablecimiento = require('express').Router();
const Ctrl = require('../controllers/obra.social.controller')

RouterEstablecimiento.post('/registro', Ctrl.registro);

// RouterEstablecimiento.get('/', Ctrl.principal);
// RouterEstablecimiento.get('/buscar/:key/:value', Ctrl.buscar);

// RouterEstablecimiento.put('/editar', Ctrl.editar);

// RouterEstablecimiento.delete('/eliminar', Ctrl.eliminar);

module.exports = RouterEstablecimiento;