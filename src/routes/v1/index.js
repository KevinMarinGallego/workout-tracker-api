
const express = require('express');
const router = express.Router();

// IMPORTA correctamente el router de usuarios
const usersRoutes = require('./users.routes'); // <-- esto faltaba
const exercisesRoutes = require('./exercises.routes');



router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);

module.exports = router;
