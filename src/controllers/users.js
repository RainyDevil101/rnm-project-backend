import crypto from "node:crypto";
import { Op } from "sequelize";
import bcryptjs from "bcryptjs";

import {
    validateElement,
    validatePartialElement,
} from "../validations/index.js";
import { generateJWT } from "../helpers/generateJWT.js";

export class UserController {
    constructor({ model, schema }) {
        this.Model = model;
        this.schema = schema;
    }

    getUser = async (req, reply) => {
        const { id } = req.params;

        try {
            const user = await this.Model.findOne({
                where: {
                    id,
                    status: true,
                },
            });

            if (!user) {
                return reply.code(404).send({ error: "User not found." });
            }

            return reply.send(user);
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ error: "Internal server error." });
        }
    };

    getUsers = async (req, reply) => {
        const { limit = 10, from = 1 } = req.query;
        const offset = (from - 1) * limit;

        try {
            const users = await this.Model.findAll({
                where: {
                    status: true,
                },
                offset,
                limit: Number(limit),
            });

            return reply.send(users);
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ error: "Internal server error." });
        }
    };

    createUser = async (req, reply) => {
        try {
            if (!req.body) {
                return reply.code(400).send({ error: "Empty Body" });
            }

            req.body.role_id = "29465348-5412-47ad-87c5-3eee60f6eb6f";

            const result = await validateElement({
                input: req.body,
                schema: this.schema,
            });

            if (result.error) {
                const errors = [];
                const getErrors = result.error.errors;

                getErrors.forEach((error) => {
                    errors.push({ error: error.message });
                });

                return reply.code(400).send(errors);
            }

            const data = result.data;

            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(data.password, salt);

            const id = crypto.randomUUID();

            await this.Model.create({
                id,
                ...data,
            });

            const userCreated = await this.Model.findOne({
                where: {
                    id,
                    status: true,
                },
            });

            const token = await generateJWT(userCreated.dataValues.id);

            return reply.code(201).send({user: userCreated, token});
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ error: "Internal server error" });
        }
    };

    deleteUser = async (req, reply) => {
        const { id } = req.params;

        try {
            const user = await this.Model.findOne({
                where: {
                    id,
                    status: false,
                },
            });

            if (!user) {
                return reply.code(400).send({ error: "User doesn't exist." });
            }

            await user.update({ status: false });

            return reply.code(200).send(user);
        } catch (error) {
            console.error(error);
            return reply.code(400).send({ error: `Error` });
        }
    };

    updateUser = async (req, reply) => {
        try {
            const result = await validatePartialElement({
                input: req.body,
                schema: this.schema,
            });

            if (result.error) {
                return reply
                    .code(400)
                    .send({ error: JSON.parse(result.error.message) });
            }

            const { id } = req.params;

            const user = await this.Model.findOne({
                where: {
                    id,
                    status: true,
                },
            });

            if (!user) {
                return reply.code(400).send({ error: "User doesn't exist." });
            }

            if (result.data.email) {
                const emailExists = await this.Model.findOne({
                    where: {
                        id: { [Op.ne]: id },
                        email: result.data.email,
                    },
                });

                if (emailExists) {
                    return reply.code(400).send({
                        error: `Email ${result.data.email} is already in use.`,
                    });
                }
            }

            await user.update(result.data);

            return reply.code(200).send({ message: "User updated." });
        } catch (error) {
            console.error(error);
            return reply.code(400).send({ error: `Error` });
        }
    };
}
