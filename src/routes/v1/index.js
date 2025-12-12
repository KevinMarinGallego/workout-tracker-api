
const express = require('express');
const router = express.Router();

// IMPORTA correctamente el router de usuarios
const usersRoutes = require('./users.routes'); // <-- esto faltaba

router.use('/users', usersRoutes);

module.exports = router;
