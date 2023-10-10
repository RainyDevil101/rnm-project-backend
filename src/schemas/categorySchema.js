import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.'
    })
    .min(5)
    .max(45)
});