import crypto from 'node:crypto';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';

import User from '../models/user.js';

import { validatePartialUser, validateUser } from '../schemas/userSchema.js';
import { validateIfEmailExists } from '../validations/validateIfEmailExists.js';

export const getUser = async (req, reply) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    return reply.code(200).send(user);
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };
};

export const getUsers = async (req, reply) => {

  const { limit = 10, from = 1 } = req.query;

  const offset = (from - 1) * limit;

  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
      offset,
      limit: Number(limit)
    })

    return reply.code(200).send({ users });
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  }
};

export const createUser = async (req, reply) => {

  try {

    const result = await validateUser(req.body);

    if (result.error) {
      return reply.code(400).send({ error: JSON.parse(result.error.message) });
    };

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

    return reply.code(200).send({ message: `User ${rest.username} has been created.` });

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' })
  }
};

export const deleteUser = async (req, reply) => {

  const { id } = req.params;

  try {

    const user = await User.findOne({
      where: {
        id,
        status: false,
      },
    });

    if (!user) {
      return reply.code(400).send({ message: "User doesn't exist." });
    };

    await user.update({ status: false });

    return reply.code(200).send( user );

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

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return reply.code(400).send({ message: "User doesn't exist." })
    };

    if (result.data.email) {

      const emailExists = await User.findOne({
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