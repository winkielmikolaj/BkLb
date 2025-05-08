const User = require('../models/User');

const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      const userId = req.body.userId; // Zakładamy, że userId jest przekazywane w body
      if (!userId) {
        return res.status(401).json({ error: 'Brak autoryzacji' });
      }

      const user = User.getById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Użytkownik nie znaleziony' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: 'Brak uprawnień' });
      }

      next();
    } catch (error) {
      console.error('Error in checkRole middleware:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  };
};

module.exports = { checkRole }; 