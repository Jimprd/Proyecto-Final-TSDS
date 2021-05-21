const UsuarioRoutes = require('express').Router();
const auth = require('../middleware/auth');
const Ctrl = require('../controllers/usuario.controller');

// Acceso Privado
UsuarioRoutes.get('/', auth, Ctrl.principal);
UsuarioRoutes.get('/buscar/:key/:value', auth,Ctrl.buscar);

UsuarioRoutes.put('/editar', auth,Ctrl.editar);

UsuarioRoutes.delete('/eliminar', auth,Ctrl.eliminar);


// Acceso Público
UsuarioRoutes.post('/registro', Ctrl.registro);
UsuarioRoutes.post('/login', Ctrl.login);

module.exports = UsuarioRoutes;
