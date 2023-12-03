import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

export const Expense = db.define('expenses', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  amount: {
    type: DataTypes.NUMBER
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  type: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.UUIDV4,
  },
  account_id: {
    type: DataTypes.UUIDV4,
  },
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});