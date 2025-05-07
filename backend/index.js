const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes'); // Upewnij się, że plik się zgadza

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes); // Wszystkie requesty do /api/books będą kierowane do bookRoutes

// Globalny middleware błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
