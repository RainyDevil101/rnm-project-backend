import { User } from "../models/index.js";

export const validateIfEmailExists = async (req, reply) => {
    const { email } = req.body;

    try {
        const emailExists = await User.findOne({ where: { email } });
        if (Boolean(emailExists)) {
            return reply
                .code(400)
                .send({ error: `El email ${email} ya se encuentra en uso` });
        }
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error;
    }
};
