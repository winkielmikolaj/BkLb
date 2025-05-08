const { db } = require('./db');
const User = require('./models/User');
const Book = require('./models/book');

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

    // Seed sample books if none exist
    console.log('Checking for sample books...');
    const books = Book.getAll();
    if (books.length === 0) {
      console.log('Adding sample books...');
      
      const sampleBooks = [
        {
          title: 'Władca Pierścieni',
          author: 'J.R.R. Tolkien',
          content: `W pewnej norze ziemnej mieszkał sobie pewien hobbit. Nie była to szkaradna, brudna, wilgotna nora, rojąca się od robaków i cuchnąca błotem, ani też pusta, zimna, piaszczysta jama bez podłogi i mebli: była to nora hobbita, a to znaczy: nora wygodna.

          Była to nora z okrągłymi drzwiami, pomalowanymi na zielono, z mosiężną klamką, dokładnie pośrodku. Drzwi te otwierały się na długi korytarz, podobny do tunelu: był to bardzo wygodny tunel, bez dymu, z wybielonymi ścianami, wyłożony posadzką z płytek i pokryty dywanami, zaopatrzony w wyściełane krzesła i mnóstwo haczyków na kapelusze i płaszcze - hobbit lubił gości. Tunel wijący się dalej i głębiej, ale nie prosto, jak to bywa w norach większości ludzi, którzy, jak wiadomo, zadowalają się zwykłymi dziurami w ziemi.`
        },
        {
          title: '1984',
          author: 'George Orwell',
          content: `Był jasny, zimny dzień kwietniowy i zegary biły trzynastą. Winston Smith, przyciskając brodę do piersi, aby uniknąć lodowatego wiatru, szybko wślizgnął się przez szklane drzwi bloku mieszkalnego, ale nie dość szybko, aby powstrzymać przedostanie się do środka wiru brudnego pyłu.

          Korytarz pachniał gotowaną kapustą i starymi matami. Na jednym końcu korytarza, daleko stąd, kolorowy plakat, zbyt duży, aby można go było umieścić wewnątrz, był przyklejony do ściany. Przedstawiał tylko ogromną twarz, ponad metr szeroka: twarz mężczyzny około czterdziestki, z wąsami i przystrzyżonymi bokobrodami, o twardych, ale przystojnych rysach.`
        }
      ];

      for (const book of sampleBooks) {
        Book.create(book);
      }
      console.log('Sample books added successfully');
    } else {
      console.log('Sample books already exist');
    }

    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};

console.log('Initializing database...');
initDB(); 