import { Sequelize } from 'sequelize';
import { keys } from './keys.js';

const { database, host, password, user } = keys;

export const db = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
});