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
  icon_name: {
    type: DataTypes.STRING
  },
  color_hex: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});