import jwt from "jsonwebtoken";

import "dotenv/config";

export const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("Token can not be generated");
                } else {
                    resolve(token);
                }
            }
        );
    });
};
