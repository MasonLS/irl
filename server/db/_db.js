const Sequelize = require('sequelize');
const path = require('path');
const env = path.join(__dirname, '../env');

const db = new Sequelize(env.DATABASE_URI, {
  logging: env.LOGGING,
  native: env.NATIVE
});

module.exports = db;
