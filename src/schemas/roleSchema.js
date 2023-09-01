import z from 'zod';

const roleSchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.'
    })
    .min(5)
    .max(45)
});

export const validateRole = (object) => {
  return roleSchema.safeParseAsync(object);
};

export const validatePartialRole = (object) => {
  return roleSchema.partial().safeParseAsync(object);
};
