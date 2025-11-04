const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const dbFile = path.join(__dirname, '..', '..', 'data', 'db.json');
let dbInstance;

async function getDb() {
  if (!dbInstance) {
    const adapter = new JSONFile(dbFile);
    dbInstance = new Low(adapter, {
      notes: [],
      finance: [],
      schedule: [],
      reminders: [],
      study: []
    });
    await dbInstance.read();
    await dbInstance.write();
  }
  return dbInstance;
}

module.exports = { getDb };


