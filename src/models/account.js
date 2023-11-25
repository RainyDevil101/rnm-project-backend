import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

export const Account = db.define('accounts', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.UUIDV4,
  },
  color_hex: {
    type: DataTypes.STRING
  },
  currency_name: {
    type: DataTypes.STRING
  },
  icon_url: {
    type: DataTypes.STRING
  },
  currency_code: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  },
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});