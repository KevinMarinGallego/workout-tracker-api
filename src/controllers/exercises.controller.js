const { randomUUID } = require("crypto");

// Datos en memoria
let exercises = [
  {
    id: "d09f3bb4-35b6-4a7b-b5a1-09f01d3a28bc",
    name: "Sentadilla",
    description: "Ejercicio de fuerza para piernas",
    category: "strength",
    muscleGroup: "legs",
    createdAt: "2025-09-10T08:30:00Z",
  },
];

// Obtener todos los ejercicios
const getAllExercises = (req, res) => {
  try {
    const { category, muscleGroup, search, limit } = req.query;
    let result = exercises;

    if (category)
      result = result.filter((e) => e.category === String(category).trim());
    if (muscleGroup)
      result = result.filter(
        (e) => e.muscleGroup === String(muscleGroup).trim()
      );
    if (search) {
      const s = String(search).toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(s) ||
          e.description.toLowerCase().includes(s)
      );
    }
    if (limit && Number(limit) > 0) result = result.slice(0, Number(limit));

    return res
      .status(200)
      .json({ success: true, data: result, total: result.length });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al listar ejercicios",
      message: error.message,
    });
  }
};

// Obtener ejercicio por ID
const getExerciseById = (req, res) => {
  try {
    const { id } = req.params;
    const exercise = exercises.find((e) => e.id === id);
    if (!exercise) {
      return res
        .status(404)
        .json({ success: false, error: "Ejercicio no encontrado" });
    }
    return res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al obtener ejercicio",
      message: error.message,
    });
  }
};

// Crear ejercicio
const createExercise = (req, res) => {
  try {
    const { name, description, category, muscleGroup } = req.body;
    if (!name || !description || !category || !muscleGroup) {
      return res.status(400).json({
        success: false,
        error: "name, description, category y muscleGroup son requeridos",
      });
    }
    const newExercise = {
      id: randomUUID(),
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category).trim(),
      muscleGroup: String(muscleGroup).trim(),
      createdAt: new Date().toISOString(),
    };
    exercises.push(newExercise);
    return res
      .status(201)
      .json({ success: true, message: "Ejercicio creado", data: newExercise });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al crear ejercicio",
      message: error.message,
    });
  }
};

// Actualizar ejercicio completo
const updateExercise = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, muscleGroup } = req.body;
    if (!name || !description || !category || !muscleGroup) {
      return res
        .status(400)
        .json({ success: false, error: "Todos los campos son requeridos" });
    }
    const idx = exercises.findIndex((e) => e.id === id);
    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Ejercicio no encontrado" });
    }
    exercises[idx] = {
      ...exercises[idx],
      name,
      description,
      category,
      muscleGroup,
    };
    return res.status(200).json({
      success: true,
      message: "Ejercicio actualizado",
      data: exercises[idx],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al actualizar ejercicio",
      message: error.message,
    });
  }
};

// Actualización parcial
const partialUpdateExercise = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (
      !updates ||
      typeof updates !== "object" ||
      Object.keys(updates).length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Debes proporcionar al menos un campo para actualizar",
      });
    }
    const idx = exercises.findIndex((e) => e.id === id);
    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Ejercicio no encontrado" });
    }
    exercises[idx] = { ...exercises[idx], ...updates };
    return res.status(200).json({
      success: true,
      message: "Ejercicio actualizado parcialmente",
      data: exercises[idx],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al actualizar parcialmente",
      message: error.message,
    });
  }
};

// Eliminar ejercicio
const deleteExercise = (req, res) => {
  try {
    const { id } = req.params;
    const idx = exercises.findIndex((e) => e.id === id);
    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Ejercicio no encontrado" });
    }
    const deleted = exercises.splice(idx, 1)[0];
    return res
      .status(200)
      .json({ success: true, message: "Ejercicio eliminado", data: deleted });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al eliminar ejercicio",
      message: error.message,
    });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  partialUpdateExercise,
  deleteExercise,
};
