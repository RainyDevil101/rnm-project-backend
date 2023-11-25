import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

export const UserCategory = db.define('user_category', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUIDV4,
  },
  category_id: {
    type: DataTypes.UUIDV4,
  },
  status: {
    type: DataTypes.BOOLEAN
  },
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});