import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const User = db.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  firstlastname: {
    type: DataTypes.STRING
  },
  secondlastname: {
    type: DataTypes.STRING
  },
  role_id: {
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

export default User;