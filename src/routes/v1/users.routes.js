
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser
} = require('../../controllers/users.controller'); // Ajusta la ruta si es necesario

const router = express.Router();

// RUTAS DE USERS
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', partialUpdateUser);
router.delete('/:id', deleteUser);

module.exports = router;
