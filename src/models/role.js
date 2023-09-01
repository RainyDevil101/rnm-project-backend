import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Role = db.define('role', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  updatedAt: 'updatedat',
  createdAt: 'createdat'
});

export default Role;
