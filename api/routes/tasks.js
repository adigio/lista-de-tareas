const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res, next) => {
  const { title, description, completed } = req.body;

  try {
    const newTask = await Task.create({ title, description, completed });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed !== undefined ? completed : task.completed;

      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      await task.destroy();
      res.status(204).json({ message: 'Tarea eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'No se pudo encontrar la tarea con ese ID' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
