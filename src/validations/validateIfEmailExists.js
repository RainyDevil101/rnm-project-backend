import { User } from "../models/index.js";

export const validateIfEmailExists = async (email) => {
    try {
        const emailExists = await User.findOne({ where: { email } });
        return Boolean(emailExists);
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error;
    }
};
