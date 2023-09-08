import Role from '../models/role.js';

export const getValidRoles = async () => {

  try {

    const roles = await Role.findAll();

    return roles.map(role => role.id);

  } catch (error) {
    console.error(error);
    throw error;
  }

};