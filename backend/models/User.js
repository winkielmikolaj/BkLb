const { db } = require('../db');

class User {
  static create({ username, password, role = 'user' }) {
    try {
      console.log('Creating user:', { username, role });
      const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
      const result = stmt.run(username, password, role);
      console.log('User created with ID:', result.lastInsertRowid);
      return this.getById(result.lastInsertRowid);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static getByUsername(username) {
    try {
      console.log('Getting user by username:', username);
      const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
      const user = stmt.get(username);
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  }

  static getById(id) {
    try {
      console.log('Getting user by ID:', id);
      const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
      const user = stmt.get(id);
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  }

  static getAll() {
    try {
      console.log('Getting all users');
      const stmt = db.prepare('SELECT * FROM users');
      const users = stmt.all();
      console.log('Found users:', users);
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }
}

module.exports = User; 