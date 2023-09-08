import crypto from 'node:crypto';
import Category from '../models/category.js';
import { validateCategory } from '../schemas/categorySchema.js';

export const getCategory = async (req, reply) => {

  const { id } = req.params;

  try {

    const category = await Category.findOne({
      where: {
        id,
        status: true,
      },
    });

    return reply.code(200).send(category);
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };
};

export const getCategories = async (req, reply) => {

  const { limit = 10, from = 1 } = req.query;

  const offset = (from - 1) * limit;

  try {
    const categories = await Category.findAll({
      where: {
        status: true
      },
      offset,
      limit: Number(limit)
    });

    return reply.code(200).send(categories);
  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };

};

export const createCategory = async (req, reply) => {

  try {

    const result = await validateCategory(req.body);

    if (result.error) {
      return reply.code(400).send({ error: JSON.parse(result.error.message) });
    };

    const { name } = result.data;

    const nameExists = await Category.findOne({
      where: { name }
    });

    if (nameExists) {
      return reply.code(400).send({ error: `${name} is already in use.` });
    };

    const category = new Category({
      id: crypto.randomUUID(),
      name,
    });

    await category.save();

    return reply.code(200).send({ message: `Category ${name} has been created.` });

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };

};

export const deleteCategory = async (req, reply) => {

  const { id } = req.params;
  const uid = req.uid;

  try {

    const category = await Category.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!category) {
      return reply.code(400).send({ error: "Category doesn't exist." })
    };

    await category.update({ status: false });

    return reply.code(200).send({ category, uid });

  } catch (error) {
    console.error(error);
    return reply.code(400).send({ error: 'Error' });
  };

};

export const updateCategory = async (req, reply) => {
  const category = await { category: 'Put category' };
  return reply.code(200).send(category);
};