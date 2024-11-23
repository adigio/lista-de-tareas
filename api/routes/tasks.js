var express = require('express');
var router = express.Router();

let tasks = [
    {
      id:1,
      title: 'Terminar la carrera',
      description: 'Hay que terminar la carrera',
      completed: false
    }
];

router.get('/', function(req, res, next) {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.post('/', function(req, res, next) {
  const { title, description, completed } = req.body;
  const newTask = { id: tasks.length + 1, description, title, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { description, title, completed } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (description !== undefined) task.description = description;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});


module.exports = router;
