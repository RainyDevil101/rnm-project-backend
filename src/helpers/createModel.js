import crypto from 'node:crypto';

export const createModel = ({ data, model }) => {

  const element = new model({
    id: crypto.randomUUID(),
    ...data
  });

  return { element };

};