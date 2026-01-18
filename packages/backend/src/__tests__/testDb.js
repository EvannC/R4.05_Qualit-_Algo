const fs = require('fs');
const os = require('os');
const path = require('path');

const db = require('../db/database');

const makeTempDbPath = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'backend-db-'));
  return path.join(dir, 'test.sqlite');
};

const setupTestDb = async () => {
  process.env.DB_PATH = makeTempDbPath();
  await db.connect();
};

const teardownTestDb = async () => {
  await db.closeConnection();
  // on ne supprime pas le fichier ici pour éviter des soucis Windows; optionnel
};

module.exports = { setupTestDb, teardownTestDb };
