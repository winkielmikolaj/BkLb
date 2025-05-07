const User = require('../models/User');

exports.register = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = User.getByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create new user
    const user = User.create({ username, password });
    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Find user
    const user = User.getByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Error during login" });
  }
}; 