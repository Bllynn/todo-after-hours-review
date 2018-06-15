const express = require('express');
const bodyParser = require('body-parser');

const port = 3005;

const app = express();

app.use(bodyParser.json());

let tasks = [
  { actionItem: 'Wash dog', id: 0 },
  { actionItem: 'blow dry dog', id: 1 },
  { actionItem: 'walk dog', id: 2 },
  { actionItem: 'walk dog', id: 3 },
];
let id = 4;

app.get('/api/tasks', (req, res) => {
  res.status(200).send(tasks);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id: idToDelete } = req.params;
  tasks = tasks.filter(task => task.id !== +idToDelete);
  res.send(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { actionItem } = req.body;
  const newTask = { actionItem, id };
  id += 1;
  tasks.push(newTask);
  res.send(tasks);
});

app.listen(port, () => {
  console.log(`deploying ${port} rubber ducks`);
});
