export const getBill = async (req, reply) => {
  // console.log(req.params.id);
  const bill = await { bill: 'Get bill' };
  return reply.code(200).send(bill);
};

export const getBills = async (req, reply) => {
  const bills = await { bills: 'Get bills' };
  return reply.code(200).send(bills);
};

export const createBill = async (req, reply) => {
  const bill = await { bill: 'Post bill' };
  return reply.code(200).send(bill);
};

export const deleteBill = async (req, reply) => {
  const bill = await { bill: 'Delete bill' };
  return reply.code(200).send(bill);
};

export const updateBill = async (req, reply) => {
  const bill = await { bill: 'Put bill' };
  return reply.code(200).send(bill);
};