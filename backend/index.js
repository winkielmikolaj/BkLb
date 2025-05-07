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

const PORT = 3000; // Port backendu
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});