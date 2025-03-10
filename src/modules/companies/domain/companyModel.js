const { DataTypes } = require('sequelize');
const sequelize = require('../../../core/db');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cuit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  razon_social: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adhesion_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'companies',
  timestamps: false
});

module.exports = Company;