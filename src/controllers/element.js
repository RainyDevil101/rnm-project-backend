import { validateElement, validatePartialElement } from '../validations/validationsBySchema.js';
import { insertElementInDB, handleNewAccount, createModel } from '../helpers/index.js';
import { Expense } from '../models/expense.js';
import { getCommonConfig, getQueryOptions, deleteExpensesRelationated } from '../utils/index.js';

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
        // Obtén las cuentas con sus gastos asociados
        const accountsWithExpenses = await this.Model.findAll({
          ...commonConfig,
          include: {
            model: Expense,
            as: 'expenses',
          },
        });

        // Ordena cada cuenta junto con sus gastos asociados
        elements = accountsWithExpenses.map(account => {
          return {
            ...account.toJSON(),
            expenses: account.expenses.sort((a, b) => new Date(b.createdat) - new Date(a.createdat)),
          };
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

  /**
 * Controlador para eliminar un elemento del modelo.
 * @param {Object} req - Objeto de solicitud (Request) de Fastify.
 * @param {Object} reply - Objeto de respuesta (Reply) de Fastify.
 * @returns {Object} - Objeto de respuesta que indica el resultado de la operación.
 */

  deleteElement = async (req, reply) => {

    try {
      const { id } = req.params;

      // Validar si el ID está presente en la solicitud
      if (!id) {
        return reply.code(400).send({ error: "Id needed" });
      }

      // Buscar el elemento en la base de datos
      const element = await this.Model.findOne({
        where: {
          id,
          status: true,
        },
      });

      // Verificar si el elemento existe
      if (!element) {
        return reply.code(400).send({ error: "Invalid element" });
      }

      // Si el elemento es de tipo 'account', eliminar gastos relacionados
      if (this.name === 'account') {
        const deleteExpensesResult = await deleteExpensesRelationated({ id });

        // Manejar errores al eliminar gastos relacionados
        if (deleteExpensesResult.error) {
          return reply.code(500).send({ error: 'Error deleting associated expenses.' });
        }
      }

      // Eliminar el elemento
      await element.destroy();

      // Enviar respuesta exitosa
      return reply.code(200).send({ message: 'Deleted successfully' });
    } catch (error) {
      console.error(error);
      // Enviar respuesta de error interno del servidor
      return reply.code(500).send({ error: 'Internal Server Error' });
    }

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