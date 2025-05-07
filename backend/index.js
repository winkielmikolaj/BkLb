const express = require('express');
const todosRoutes = require('./routes/todos');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/todos', todosRoutes);

// Globalny middleware błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
