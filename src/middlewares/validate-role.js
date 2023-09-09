import { getRoleByName } from '../utils/getValidRoles.js';

const validateRole = (roleToValidate) => async (req, reply, next) => {
  if (!req.user) {
    return reply.code(500).send({ error: 'Token has not been validated.' });
  };

  const { role_id, username } = req.user;

  const response = await getRoleByName(roleToValidate, role_id);

  if(!response) {
    return reply.code(501).send({ error: `${username} hast not ${roleToValidate} role.` });
  };

};

export const validateAdminRole = validateRole('ADMIN');
export const validateUserRole = validateRole('USER');