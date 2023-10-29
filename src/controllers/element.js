import crypto from 'node:crypto';
import { validateElement, validatePartialElement } from '../validations/validationsBySchema.js';

export class ElementController {

  constructor({ model, schema }) {
    this.Element = model;
    this.schema = schema;
  };

  getElements = async (req, reply) => {

    const { limit = 10, from = 1 } = req.query;

    const offset = (from - 1) * limit;

    try {
      const elements = await this.Element.findAll({
        where: {
          status: true
        },
        offset,
        limit: Number(limit)
      });

      return reply.code(200).send(elements);
    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: 'Error' });
    };

  };

  getElement = async (req, reply) => {

    const { id } = req.params;

    try {

      const element = await this.Element.findOne({
        where: {
          id,
          status: true,
        },
      });

      return reply.code(200).send(element);
    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: 'Error' });
    };
  };

  createElement = async (req, reply) => {

    try {

      const result = await validateElement({ input: req.body, schema: this.schema });

      if (result.error) {
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      };

      const { name } = result.data;

      const nameExists = await this.Element.findOne({
        where: { name }
      });

      if (nameExists) {
        return reply.code(400).send({ error: `${name} is already in use.` });
      };

      const element = new this.Element({
        id: crypto.randomUUID(),
        name,
      });

      await element.save();

      return reply.code(200).send({ message: `${name} has been created.` });

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: 'Error' });
    };

  };

  deleteElement = async (req, reply) => {

    const { id } = req.params;
    const uid = req.uid;

    try {

      const element = await this.Element.findOne({
        where: {
          id,
          status: true,
        },
      });

      if (!element) {
        return reply.code(400).send({ error: "this.Element doesn't exist." })
      };

      await element.update({ status: false });

      return reply.code(200).send({ element, uid });

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: 'Error' });
    };

  };

  updateElement = async (req, reply) => {

    const { id } = req.params;
    const input = req.body;

    if (!id) return reply.code(400).send({ error: "Invalid id." });

    if (!input || input.length === 0) return reply.code(400).send({ error: "Body needed." });

    const resultValidation = await validatePartialElement({ input, schema: this.schema });

    if (resultValidation.error) return reply.code(400).send({ error: JSON.parse(result.error.message) });

    const element = await this.Element.findOne({
      where: {
        id,
        status: true,
      }
    })

    if (!element) {
      return reply.code(400).send({ error: "this.Element doesn't exist." })
    };

    await element.update({});

    // const element = await { element: 'Put element' };
    return reply.code(200).send(element);
  };
};