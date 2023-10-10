export const validateElement = async ({ input, schema }) => {

  return schema.safeParseAsync(input);

};

export const validatePartialElement = async ({ input, schema }) => {

  return schema.partial().safeParseAsync(input);

};

