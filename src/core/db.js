const { Sequelize } = require('sequelize');
const { PG_URL } = require('./config');

const sequelize = new Sequelize(PG_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;