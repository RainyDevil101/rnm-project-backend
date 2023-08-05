export const getUser = async (req, reply) => {
  // console.log(req.params.id);
  const user = await { user: 'Get user' };
  return reply.code(200).send(user);
};

export const getUsers = async (req, reply) => {
  const users = await { users: 'Get users' };
  return reply.code(200).send(users);
};

export const createUser = async (req, reply) => {
  const user = await { user: 'Post user' };
  return reply.code(200).send(user);
};

export const deleteUser = async (req, reply) => {
  const user = await { user: 'Delete user' };
  return reply.code(200).send(user);
};

export const updateUser = async (req, reply) => {
  const user = await { user: 'Put user' };
  return reply.code(200).send(user);
};