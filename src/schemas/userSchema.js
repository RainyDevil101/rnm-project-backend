import z from 'zod';

const userSchema = z.object({
  username: z
    .string(45, {
      invalid_type_error: 'Username must be a string.',
      required_error: 'Username is required.'
    })
    .min(5)
    .max(45),
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required.'
    })
    .min(10)
    .max(255),
  email: z
    .string(45, {
      required_error: 'Email is required.'
    })
    .min(5)
    .max(45)
    .email({
      message: 'Email not valid.'
    }),
  name: z
    .string(45, {
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.'
    })
    .min(1)
    .max(45),
  firstlastname: z
    .string(45, {
      invalid_type_error: 'Lastname must be a string.',
      required_error: 'Lastname is required.'
    })
    .min(1)
    .max(45),
  secondlastname: z
    .string(45, {
      invalid_type_error: 'Lastname must be a string.',
      required_error: 'Lastname is required.'
    })
    .min(1)
    .max(45),
  role_id: z
    .string({
      invalid_type_error: 'Role must be a string.',
      required_error: 'Role is required.'
    }),
});

export const validateUser = (object) => {

  return userSchema.safeParseAsync(object);

};

export const validatePartialUser = (object) => {
  return userSchema.partial().safeParseAsync(object);
};