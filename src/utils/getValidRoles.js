import Role from '../models/role.js';

export const getValidRoles = async () => {

  try {

    const roles = await Role.findAll();

    if (!roles) {
      console.error(error);
      throw error;
    };

    return roles.map(role => role.id);

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
      }
    })

    if (!role) {
      return false;
    }

    if (role.id !== role_id) {
      return false;
    };

    return true;

  } catch (error) {
    console.error(error);
    throw error;
  };

};