import crypto from 'node:crypto';
import { validateElement, validatePartialElement } from '../validations/validationsBySchema.js';

export class ElementController {

  constructor({ model, schema }) {
    this.Model = model;
    this.schema = schema;
  };

  getElements = async (req, reply) => {

    const { limit = 10, from = 1 } = req.query;

    const offset = (from - 1) * limit;
    const user_id = req.user.id;

    try {
      const elements = await this.Model.findAll({
        where: {
          user_id,
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

      const element = await this.Model.findOne({
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

    console.log(req.body);

    return;

    try {

      const result = await validateElement({ input: req.body, schema: this.schema });

      if (result.error) {
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      };

      const { data } = result;

      const element = new this.Model({
        id: crypto.randomUUID(),
        ...data
      });

      const newElement = await element.save().then(function (newElement) {
        return newElement;
      });

      console.log(newElement);

      return reply.code(200).send(newElement);

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: 'Error' });
    };

  };

  deleteElement = async (req, reply) => {

    const { id } = req.params;
    const uid = req.uid;

    try {

      const element = await this.Model.findOne({
        where: {
          id,
          status: true,
        },
      });

      if (!element) {
        return reply.code(400).send({ error: "Doesn't exist." })
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

    const element = await this.Model.findOne({
      where: {
        id,
        status: true,
      }
    })

    if (!element) {
      return reply.code(400).send({ error: "Doesn't exist." })
    };

    await element.update({});

    // const element = await { element: 'Put element' };
    return reply.code(200).send(element);
  };
};