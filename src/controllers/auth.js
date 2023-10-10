import bcryptjs from 'bcryptjs';

import User from '../models/user.js';
import { generateJWT } from '../helpers/generateJWT.js';

export const login = async (req, reply) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return reply.code(400).send({ message: 'Internal error' });
  }

  try {

    // Verify if email exists

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.code(400).send({ message: 'User / Password is not valid. --Email' });
    };

    // Verify user status

    if (!user.dataValues.status) {
      return reply.code(400).send({ message: 'User / Password is not valid. --Status: false' });
    };

    // Verify password

    const validPassword = await bcryptjs.compare(password, user.dataValues.password);

    if (!validPassword) {
      return reply.code(400).send({ message: 'User / Password is not valid. --Password' });
    }

    // Generate JWT

    const token = await generateJWT(user.dataValues.id);

    return reply.code(200).send({token, user});
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: 'Internal Server Error' });
  };

};