const User = require('../models/User');

// Rejestruje nowego użytkownika
exports.register = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Sprawdź czy użytkownik istenieje
    const existingUser = User.getByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Stwórz nowego użytkownika
    const user = User.create({ username, password });
    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Loguje użytkownika
exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Znajdź uzytkownika
    const user = User.getByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Sprawdz haslo
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Zwroc uzytkownika
    const { password: _, ...userInfo } = user;
    res.json({ message: "Login successful", user: userInfo });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Error during login" });
  }
}; 