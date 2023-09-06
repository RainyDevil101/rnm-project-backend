import z from 'zod';

const categorySchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.'
    })
    .min(5)
    .max(45)
});

export const validateCategory = (object) => {
  return categorySchema.safeParseAsync(object);
};

export const validatePartialCategory = (object) => {
  return categorySchema.partial().safeParseAsync(object);
};
