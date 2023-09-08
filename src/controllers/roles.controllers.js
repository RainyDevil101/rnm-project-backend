import crypto from 'node:crypto';
import Role from '../models/role.js';
import { validateRole } from '../schemas/roleSchema.js';
import { Op } from 'sequelize';

export const getRole = async (req, reply) => {

  const { id } = req.params;

  try {
    const role = await Role.findOne({
      where: {
        id,
        status: true,
      },
    });

    return reply.code(200).send(role);
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };

};

export const getRoles = async (req, reply) => {

  try {

    const roles = await Role.findAll({
      where: {
        status: true,
      },
    });

    return reply.code(200).send(roles);

  } catch (error) {

    console.error(error);
    return reply.code(400).send({ error: 'Error' })
  }

};

export const createRole = async (req, reply) => {

  try {

    const result = await validateRole(req.body);

    if (result.error) {
      return reply.code(400).send({ error: JSON.parse(result.error.message) });
    }

    const { name } = result.data;

    const nameExists = await Role.findOne({
      where: { name }
    });

    if (nameExists) {
      return reply.code(400).send({ error: `${name} is already in use.` });
    };

    const role = new Role({
      id: crypto.randomUUID(),
      name
    });

    await role.save();

    return reply.code(200).send({ message: `Role ${name} has been created.` });

  } catch (error) {

    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };

};

export const deleteRole = async (req, reply) => {

  const { id } = req.params;

  try {

    const role = await Role.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!role) {
      return reply.code(400).send({ message: "Role doesn't exits." });
    };

    await role.update({ status: false });

    return reply.code(200).send(role);

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: `Error` });
  };

};

export const updateRole = async (req, reply) => {

  const result = await validateRole(req.body);

  if (result.error) {
    return reply.code(400).send({ error: JSON.parse(result.error.message) });
  };

  const { id } = req.params;

  try {

    const role = await Role.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!role) {
      return reply.code(400).send({ message: "Role doesn't exist" });
    };

    if (result.data.name) {

      const nameExists = await Role.findOne({
        where: {
          name: result.data.name
        }
      });

      if (nameExists) {
        return reply.code(400).send({ error: `${result.data.name} is already in use.` });
      };

    };

    await role.update(result.data);

    return reply.code(200).send({ message: 'Role updated.' });
  } catch (error) {

    console.error(error);
    return reply.code(400).send({ error: `Error` });
  };

};