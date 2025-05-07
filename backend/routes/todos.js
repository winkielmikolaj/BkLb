const express = require('express');
const router = express.Router();

let todos = [];

router.get('/', (req, res) => res.json(todos));

router.post('/', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos[id] = req.body;
  res.json(todos[id]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos.splice(id, 1);
  res.sendStatus(204);
});

module.exports = router;
