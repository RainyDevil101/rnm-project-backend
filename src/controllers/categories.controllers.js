import crypto from 'node:crypto';
import Category from '../models/category.js';
import { validateCategory } from '../schemas/categorySchema.js';
import { Op } from 'sequelize';

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
      name
    });

    await category.save();

    return reply.code(200).send({ message: `Category ${name} has been created.` });

  } catch (error) {

  };

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