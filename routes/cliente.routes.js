const router = require("express").Router();
const Ctrl = require("../controllers/cliente.controller");

router.get("/", Ctrl.principal);
router.get("/buscar/:key/:value", Ctrl.buscar);

router.post("/registro", Ctrl.registro);
router.post("/login", Ctrl.login);

router.put("/editar", Ctrl.editar);

// Borrado Lógico
router.delete("/eliminar", Ctrl.eliminar);

module.exports = router;
