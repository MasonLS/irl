const db = require('./_db');
const User = require('./models/user');
const Rendezvous = require('./models/rendezvous');

module.exports = db;

User.belongsToMany(Rendezvous, { through: 'user_rendezvous' });
Rendezvous.belongsToMany(User, { through: 'user_rendezvous' });
