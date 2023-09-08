import { Sequelize } from 'sequelize';
import { keys } from './keys.js';

const { database, host, password, user } = keys;

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',

  logging: false
});

export default db;