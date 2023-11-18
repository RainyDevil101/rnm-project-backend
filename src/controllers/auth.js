import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { generateJWT } from "../helpers/generateJWT.js";

export const login = async (req, reply) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply.code(400).send({ error: "Invalid request" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.code(400).send({ error: "Usuario o contraseña no válidos" });
    }

    if (!user.dataValues.status) {
      return reply.code(400).send({ error: "User status is not valid" });
    }

    const validPassword = await bcryptjs.compare(password, user.dataValues.password);

    if (!validPassword) {
      return reply.code(400).send({ error: "Usuario o contraseña no válidos" });
    }

    const token = await generateJWT(user.dataValues.id);

    return reply.code(200).send({ token, user });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, reply) => {
  const user = req.user;

  if (!user) {
    return reply.code(400).send({ error: "Invalid user" });
  }

  try {

    const token = await generateJWT(user.id);

    return reply.code(200).send({ token, user });
  } catch (error) {
    return reply.code(400).send({ error: error });
  }

};
