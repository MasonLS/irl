const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('rendezvous', {
  when: {
    type: Sequelize.DATE,
    allowNull: false
  },
  googleMapsPlaceID: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
