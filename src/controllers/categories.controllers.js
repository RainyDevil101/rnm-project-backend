export const getCategory = async (req, reply) => {
  // console.log(req.params.id);
  const category = await { category: 'Get category' };
  return reply.code(200).send(category);
};

export const getCategories = async (req, reply) => {
  const categories = await { categories: 'Get categories' };
  return reply.code(200).send(categories);
};

export const createCategory = async (req, reply) => {
  const category = await { category: 'Post category' };
  return reply.code(200).send(category);
};

export const deleteCategory = async (req, reply) => {
  const category = await { category: 'Delete category' };
  return reply.code(200).send(category);
};

export const updateCategory = async (req, reply) => {
  const category = await { category: 'Put category' };
  return reply.code(200).send(category);
};