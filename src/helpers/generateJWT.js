import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const generateJWT = (uid = '') => {

  return new Promise((resolve, reject) => {

    const payload = { uid }

    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '1h'
    }, (err, token) => {
      if (err) {
        console.error(err);
        reject('Token can not bet generated');
      } else {
        resolve(token);
      }
    });

  });

};