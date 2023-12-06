import { validateElement, validatePartialElement } from '../validations/validationsBySchema.js';
import { insertElementInDB, handleNewAccount, createModel } from '../helpers/index.js';
import { Expense } from '../models/expense.js';

export class ElementController {

  constructor({ model, schema, name = null }) {
    this.Model = model;
    this.schema = schema;
    this.name = name;
  };


  getElements = async (req, reply) => {

    const { limit = null, from = null } = req.query;

    try {

      const user_id = req.user.id;

      const commonConfig = {
        where: {
          user_id,
          status: true
        },
        offset: (from - 1) * limit,
        limit: Number(limit)
      };

      let queryOptions;

      if (req.headers["account-id"]) {
        const accountId = req.headers["account-id"];
        queryOptions = {
          ...commonConfig,
          where: {
            ...commonConfig.where,
            account_id: accountId
          }
        };
      } else {
        queryOptions = commonConfig;
      };

      if (!limit && !from) {
        delete queryOptions.offset;
        delete queryOptions.limit;
      };

      let result;

      if (this.name === 'account') {
        result = await this.Model.findAll({
          ...commonConfig,
          include: {
            model: Expense,
            as: 'expenses',
          },
        });
      } else {
        result = await this.Model.findAll(queryOptions);
      }

      return reply.code(200).send(result);
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

    try {

      if (!req.user) return reply.code(400).send({ error: 'Invalid user' });

      const user_id = req.user.id;

      const elementData = { ...req.body, user_id };

      const result = await validateElement({ input: elementData, schema: this.schema });

      if (result.error) {
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      };

      const { data } = result;

      const { element } = createModel({ data, model: this.Model });

      const { newElement } = await insertElementInDB(element);

      if (!newElement) {
        return reply.code(400).send({ error: 'Error' });
      }

      if (this.name === 'account') {


        const { newElement: newExpense } = await handleNewAccount({ user_id, account_id: newElement.id, amount: req.body.amount });

        return reply.code(200).send({ newAccount: newElement, newExpense });

      };

      return reply.code(200).send({ newAccount: newElement, newExpense: null });

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