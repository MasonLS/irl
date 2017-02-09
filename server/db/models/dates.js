const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('date', {
  when: {
    type: Sequelize.DATE,
    allowNull: false
  },
  googleMapsPlaceID: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
