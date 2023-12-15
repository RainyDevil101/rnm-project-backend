import { validateElement, validatePartialElement } from '../validations/validationsBySchema.js';
import { insertElementInDB, handleNewAccount, createModel } from '../helpers/index.js';
import { Expense } from '../models/expense.js';
import { getCommonConfig, getQueryOptions } from '../utils/index.js';

export class ElementController {

  constructor({ model, schema, name = null }) {
    this.Model = model;
    this.schema = schema;
    this.name = name;
  };


  getElements = async (req, reply) => {

    try {

      const { limit = null, from = null } = req.query;
      const user_id = req.user.id;

      // Obtener configuración común
      const commonConfig = getCommonConfig(user_id, limit, from);

      // Obtener opciones de consulta
      const queryOptions = getQueryOptions(req.headers, commonConfig);

      // Obtener elementos según el nombre
      let elements;
      if (this.name === 'account') {
        elements = await this.Model.findAll({
          ...commonConfig,
          include: {
            model: Expense,
            as: 'expenses',
          },
        });
      } else {
        elements = await this.Model.findAll(queryOptions);
      }

      return reply.code(200).send({ elements });
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

      // Verificar si el usuario es válido
      if (!req.user) {
        return reply.code(400).send({ error: 'Invalid user' });
      };

      // Obtener el ID del usuario
      const user_id = req.user.id;

      // Preparar los datos del elemento con el ID del usuario
      const elementData = { ...req.body, user_id };

      // Validar los datos del elemento
      const result = await validateElement({ input: elementData, schema: this.schema });

      // Manejar errores de validación
      if (result.error) {
        console.error(error);
        return reply.code(400).send({ error: JSON.parse(result.error.message) });
      };

      // Extraer los datos validados
      const { data } = result;

      // Crear un modelo a partir de los datos
      const { element } = createModel({ data, model: this.Model });

      // Insertar el elemento en la base de datos
      const { newElement } = await insertElementInDB(element);

      console.log(newElement);

      // Manejar errores al insertar el elemento
      if (!newElement) {
        return reply.code(400).send({ error: 'Error' });
      }

      // Si el nombre es 'account', manejar la creación de un nuevo gasto
      if (this.name === 'account') {

        const { newElement: newExpense } = await handleNewAccount({ user_id, account_id: newElement.id, amount: req.body.amount });

        return reply.code(200).send({ newAccount: newElement, newExpense });

      };

      // Enviar la respuesta con el nuevo elemento de cuenta
      return reply.code(200).send({ newElement: newElement });

    } catch (error) {
      console.error(error);
      return reply.code(400).send({ error: error });
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