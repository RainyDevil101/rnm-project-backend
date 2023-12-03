import { Expense } from "../models/index.js";
import { createModel, insertElementInDB } from "./index.js";

export const handleNewAccount = async ({ user_id, account_id, amount }) => {

  const description = 'Saldo Inicial';
  const type = 'base';
  const data = { user_id, account_id, amount, description, type };
  const { element } = createModel({ data, model: Expense });

  const { newElement } = await insertElementInDB(element);

  return { newElement };
};