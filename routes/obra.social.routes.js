const RouterObraSocial = require('express').Router();
const Ctrl = require('../controllers/obra.social.controller')

RouterObraSocial.post('/registro', Ctrl.registro);

RouterObraSocial.get('/', Ctrl.principal);
// RouterObraSocial.get('/buscar/:key/:value', Ctrl.buscar);

// RouterObraSocial.put('/editar', Ctrl.editar);

// RouterObraSocial.delete('/eliminar', Ctrl.eliminar);

module.exports = RouterObraSocial;