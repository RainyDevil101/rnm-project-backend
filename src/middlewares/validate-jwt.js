import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const validateJWT = async (req, reply, next) => {

  const token = req.headers['x-token'];

  if (!token) {
    return reply.code(401).send({ error: 'There is not token.' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.user = await User.findOne({
      where: {

      }
    });
    
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    return reply.code(401).send({ error: 'Invalid token.' });
  };

};