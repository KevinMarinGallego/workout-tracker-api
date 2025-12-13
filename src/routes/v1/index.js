
const express = require('express');
const router = express.Router();

// Importa los routers
const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutplansRoutes = require('./workoutplans.routes'); // <-- Añadido

// Monta las rutas
router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutplans', workoutplansRoutes);

module.exports = router;
