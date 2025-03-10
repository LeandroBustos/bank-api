const { DataTypes } = require('sequelize');
const sequelize = require('../../../core/db');

const Transfer = sequelize.define('Transfer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  debit_account: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credit_account: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'transfers',
  timestamps: false
});

module.exports = Transfer;