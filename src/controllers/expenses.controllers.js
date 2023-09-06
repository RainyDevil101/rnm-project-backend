export const getExpense = async (req, reply) => {
  // console.log(req.params.id);
  const expense = await { expense: 'Get expense' };
  return reply.code(200).send(expense);
};

export const getExpenses = async (req, reply) => {
  const bills = await { bills: 'Get bills' };
  return reply.code(200).send(bills);
};

export const createExpense = async (req, reply) => {
  const expense = await { expense: 'Post expense' };
  return reply.code(200).send(expense);
};

export const deleteExpense = async (req, reply) => {
  const expense = await { expense: 'Delete expense' };
  return reply.code(200).send(expense);
};

export const updateExpense = async (req, reply) => {
  const expense = await { expense: 'Put expense' };
  return reply.code(200).send(expense);
};