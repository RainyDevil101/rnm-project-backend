import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

export const Expenses = db.define('expenses', {
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
  data: {
    type: DataTypes.DATE
  },
  user_id: {
    type: DataTypes.UUIDV4,
  },
  category_id: {
    type: DataTypes.UUIDV4,
  }
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});

export default User;