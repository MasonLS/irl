const Sequelize = require('sequelize');
const db = require('../_db');
const crypto = require('crypto');
const _ = require('lodash');

const genders = ['ff', 'fm', 'mf', 'mm'];

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  DOB: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  height: {
    type: Sequelize.DOUBLE(1, 2),
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM(...genders),
    allowNull: false
  },
  likes: {
    type: Sequelize.ARRAY(Sequelize.ENUM(...genders)),
    allowNull: false
  },
  photoURLs: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
      isValidUrl: value => {
        if (!value) return value;
        const values = Array.isArray(value) ? value : [value];
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);
        values.forEach(val => {
          if (!regex.test(val)) {
            throw new Error('Only valid URLs are allowed');
          }
        });
        return value;
      }
    }
  },
  lastCoords: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
    allowNull: false,
    validate: {
      len: 2
    }
  },
  searchRadius: {
    type: Sequelize.INTEGER,
    defaultValue: 20,
    validate: {
      isValidRadius: value => {
        if (value <= 0 || value > 50) {
          throw new Error('Search radius is either too large or two small');
        }
        return value;
      }
    }
  }
},
{
  instanceMethods: {
    sanitize: function() {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword: function(candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
    }
  },
  classMethods: {
    generateSalt: function() {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function(plainText, salt) {
      var hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    }
  },
  hooks: {
    beforeCreate: function(user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
      }
    },
    beforeUpdate: function(user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
      }
    }
  }
});
