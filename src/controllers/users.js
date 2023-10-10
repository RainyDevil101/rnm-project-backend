import crypto from 'node:crypto';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';

import { validateElement, validateIfEmailExists, validatePartialElement } from '../validations/index.js';

export class UserController {

  constructor({ model, schema }) {
    this.Model = model;
    this.schema = schema;
  };


  getUser = async (req, reply) => {
    const { id } = req.params;

    try {
      const user = await this.Model.findOne({
        where: {
          id,
          status: true,
        },
      });

      if (!user) {
        return reply.code(404).send({ error: 'User not found.' });
      };

      return reply.send(user);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal server error.' });
    };
  };

  getUsers = async (req, reply) => {

    const { limit = 10, from = 1 } = req.query;
    const offset = (from - 1) * limit;

    try {
      const users = await this.Model.findAll({
        where: {
          status: true,
        },
        offset,
        limit: Number(limit)
      });

      return reply.send(users);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal server error.' });
    };
  };

  createUser = async (req, reply) => {

    try {

      const result = await validateElement({ input: req.body, schema: this.schema });
    
      if (result.error) {
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      };

      const { email, ...rest } = result.data;

      const emailExists = await validateIfEmailExists(email);

      if (emailExists) {
        return reply.code(400).send({ error: `Email ${email} already exists.` });
      };
      
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(rest.password, salt);

      await this.Model.create({
        id: crypto.randomUUID(),
        email,
        ...rest,
      });

      return reply.code(201).send({ message: `User ${rest.username} has been created.` });

    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    };
  };

  deleteUser = async (req, reply) => {

    const { id } = req.params;

    try {

      const user = await this.Model.findOne({
        where: {
          id,
          status: false,
        },
      });

      if (!user) {
        return reply.code(400).send({ message: "User doesn't exist." });
      };

      await user.update({ status: false });

      return reply.code(200).send(user);

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: `Error` })
    }
  };

  updateUser = async (req, reply) => {

    try {

      const result = await validatePartialElement({ input: req.body, schema: this.schema });

      if (result.error) {
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      }

      const { id } = req.params;

      const user = await this.Model.findOne({
        where: {
          id,
          status: true,
        },
      });

      if (!user) {
        return reply.code(400).send({ message: "User doesn't exist." })
      };

      if (result.data.email) {

        const emailExists = await this.Model.findOne({
          where: {
            id: { [Op.ne]: id },
            email: result.data.email
          }
        });

        if (emailExists) {
          return reply.code(400).send({ error: `Email ${result.data.email} is already in use.` });
        };

      };

      await user.update(result.data);

      return reply.code(200).send({ message: 'User updated.' });

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: `Error` })
    }
  };
};