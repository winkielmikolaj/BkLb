const { db } = require('./db');
const User = require('./models/User');

// Inicjalizacja bazy danych
const initDB = () => {
  try {
    console.log('Starting database initialization...');
    
    const migration = `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT,
        is_rented BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    db.exec(migration);
    console.log('Database tables created successfully');

    // Seed admin user if not exists
    console.log('Checking for admin user...');
    const adminUser = User.getByUsername('admin');
    if (!adminUser) {
      console.log('Admin user not found, creating...');
      const newAdmin = User.create({
        username: 'admin',
        password: 'admin123', // In a real application, this should be hashed
        role: 'admin'
      });
      console.log('Admin user created successfully:', newAdmin);
    } else {
      console.log('Admin user already exists:', adminUser);
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};

console.log('Initializing database...');
initDB();
console.log('Database initialization completed'); 