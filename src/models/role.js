import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

export const Role = db.define('role', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});

export default Role;
