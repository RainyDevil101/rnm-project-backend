import crypto from 'node:crypto';
import Role from '../models/role.js';
import { validateRole } from '../schemas/roleSchema.js';

export const getRole = async (req, reply) => {
  // console.log(req.params.id);
  const role = await { role: 'Get role' };
  return reply.code(200).send(role);
};

export const getRoles = async (req, reply) => {

  try {

    const roles = await Role.findAll();
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
      where: {
        name: name
      }
     });

     if (nameExists) {
      return reply.code(400).send({ error: `${name} is already in use.` })
     };

     const role = new Role({
      id: crypto.randomUUID(),
      name
     });

     await role.save();

     return reply.code(200).send({ message: `Role "${name}" created.` });

  } catch (error) {

    console.error(error);
    return reply.code(400).send({ error: 'Error' })
  }

};

export const deleteRole = async (req, reply) => {
  const role = await { role: 'Delete role' };
  return reply.code(200).send(role);
};

export const updateRole = async (req, reply) => {
  const role = await { role: 'Put role' };
  return reply.code(200).send(role);
};