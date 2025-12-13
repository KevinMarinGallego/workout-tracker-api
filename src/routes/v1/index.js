
const express = require('express');
const router = express.Router();

// IMPORTA correctamente el router de usuarios
const usersRoutes = require('./users.routes'); // <-- esto faltaba
const exercisesRoutes = require('./exercises.routes');
const workoutsRoutes = require('./workouts.routes');



router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workouts', workoutsRoutes);

module.exports = router;
