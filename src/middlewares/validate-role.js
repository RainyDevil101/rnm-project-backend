// import { isValid } from 'zod';
import { getRoleByName } from '../utils/getValidRoles.js';

const validateRole = (...rolesToValidate) => async (req, reply) => {

  const { user } = req;

  if (!user) {
    return reply.code(500).send({ error: 'Token has not been validated.' });
  };

  try {

    const roleChecks = await Promise.all(
      rolesToValidate.map(async (role) => await getRoleByName(role, user.role_id))
    );

    if (roleChecks.some((isValid) => isValid)) {
      return;
    };

    return reply.code(501).send({ error: `${user.username} does not have a valid role.` });

  } catch (error) {
    console.error(error);
    return reply.code(500).send({ error: 'Internal server error' });
  };


};

export const validateAdminRole = validateRole('ADMIN');
export const validateUserRole = validateRole('USER');
export const validateAdminOrUserRole = validateRole('ADMIN', 'USER');