import Role from '../models/role.js';

export const getValidRoles = async () => {

  try {
    const roles = await Role.findAll();

    if (!roles) {
      throw new Error('No roles found.')
    };

    const roleIds = roles.map(role => role.id);
    return roleIds;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export const getRoleByName = async (roleToValidate, role_id) => {

  try {
    
    const role = await Role.findOne({
      where: {
        name: roleToValidate,
        id: role_id
      },
    });

    return !!role;

  } catch (error) {
    console.error(error);
    throw error;
  };

};