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
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});