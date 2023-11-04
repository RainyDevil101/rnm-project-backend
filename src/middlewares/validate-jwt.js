import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const validateJWT = async (req, reply) => {
    const token = req.headers["x-token"];

    if (!token) {
        return reply.code(401).send({ error: "There is not token." });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findOne({
            where: {
                id: uid,
                status: true,
            },
        });

        if (!user) {
            return reply
                .code(401)
                .send({ error: "Invalid token. -- User does not exist" });
        }

        req.user = user.dataValues;
    } catch (error) {
        console.log(error);
        return reply.code(401).send({ error: "Invalid token." });
    }
};
