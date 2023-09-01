import crypto from 'node:crypto';
import Sequelize from 'sequelize';
import bcryptjs from 'bcryptjs';

import User from '../models/user.js';

import { validatePartialUser, validateUser } from '../schemas/userSchema.js';
import { validateIfEmailExists } from '../validations/validateIfEmailExists.js';

export const getUser = async (req, reply) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return reply.code(200).send(user);
};

export const getUsers = async (req, reply) => {
  try {
    const users = await User.findAll();
    return reply.code(200).send(users);
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' })
  }
};

export const createUser = async (req, reply) => {

  try {

    const result = await validateUser(req.body);

    if (result.error) {
      return reply.code(400).send({ error: JSON.parse(result.error.message) });
    }

    const { email, ...rest } = result.data;

    const emailExists = await validateIfEmailExists(email);

    if (emailExists) {
      return reply.code(400).send({ error: `Email ${email} already exists.` });
    }

    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(rest.password, salt);

    const user = new User({
      id: crypto.randomUUID(),
      email,
      ...rest,
    });

    await user.save();

    return reply.code(200).send({ message: 'User created' });

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' })
  }
};

export const deleteUser = async (req, reply) => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) {
      return reply.code(400).send({ message: "User doesn't exist." })
    };

    return reply.code(200).send(user);

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: `Error` })
  }
};

export const updateUser = async (req, reply) => {

  const result = await validatePartialUser(req.body);

  if (result.error) {
    return reply.code(400).send({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if (!user) {
      return reply.code(400).send({ message: "User doesn't exist." })
    };

    if (result.data.email) {

      const emailExists = await User.findOne({
        where: {
          email: result.data.email,
          id: { [Sequelize.Op.ne]: id }
        }
      });

      if (emailExists) {
        return reply.code(400).send({ error: `Email ${result.data.email} is already in use.` });
      }

    }

    await user.update(result.data);

    return reply.code(200).send({ message: 'User updated.' });

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: `Error` })
  }


};