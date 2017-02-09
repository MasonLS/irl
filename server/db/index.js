const db = require('./_db');
const User = require('./models/user');
const Date = require('./models/date');

module.exports = db;

User.belongsToMany(Date, { through: 'user_dates' });
Date.belongsToMany(User, { through: 'user_dates' });
