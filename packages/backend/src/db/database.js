const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const initDatabase = require('./migrations/init');

let db = null;

<<<<<<< HEAD
const DB_PATH = path.join(__dirname, '..', 'database.sqlite');
=======
const getDbPath = () => process.env.DB_PATH || path.join(__dirname, '..', 'database.sqlite');
>>>>>>> 2b808a8 (chore: initial project setup)

const connect = async () => {
  if (db) {
    return db;
  }

  return new Promise((resolve, reject) => {
    try {
      const fs = require('fs');

<<<<<<< HEAD
      if (fs.existsSync(DB_PATH)) {
        const stats = fs.statSync(DB_PATH);
=======
      if (fs.existsSync(getDbPath)) {
        const stats = fs.statSync(getDbPath);
>>>>>>> 2b808a8 (chore: initial project setup)
        console.log('Database file size:', stats.size, 'bytes');

        const files = fs.readdirSync(__dirname);
        console.log('Files in db directory:', files.length);
      }

<<<<<<< HEAD
      db = new sqlite3.Database(DB_PATH, async (err) => {
=======
      db = new sqlite3.Database(getDbPath(), async (err) => {
>>>>>>> 2b808a8 (chore: initial project setup)
        if (err) {
          console.error('Error connecting to database:', err);
          reject(err);
          return;
        }

        console.log('Connected to SQLite database');

        try {
          await initDatabase(db);
          console.log('Database initialized');
          resolve(db);
        } catch (initErr) {
          console.error('Error initializing database:', initErr);
          reject(initErr);
        }
      });
<<<<<<< HEAD

=======
>>>>>>> 2b808a8 (chore: initial project setup)
    } catch (err) {
      console.error('Failed to create database connection:', err);
      reject(err);
    }
  });
};

// Get database instance - throws error if not connected
const getDb = () => {
  if (!db) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return db;
};

const closeConnection = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve();
      return;
    }

    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        reject(err);
        return;
      }
      db = null;
      resolve();
    });
  });
};

module.exports = {
  connect,
  getDb,
<<<<<<< HEAD
  closeConnection,
=======
  closeConnection
>>>>>>> 2b808a8 (chore: initial project setup)
};
