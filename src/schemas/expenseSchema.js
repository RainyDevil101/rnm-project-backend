import z from "zod";

export const expenseSchema = z.object({
  amount: z
    .number()
    .min(0, { message: "Amount must be greater than or equal to 0." })
    .max(999999999, {
      message: "Amount must be less than or equal to 999999999.",
    })
    .transform((val) => {
      return parseFloat(val);
    })
    .default(0),
  description: z.string(255, {
    invalid_type_error: "Description must be a string.",
    required_error: "Description is required.",
  }),
  type: z.string(255, {
    invalid_type_error: "Type must be a string.",
    required_error: "Type is required.",
  }),
  user_id: z.string().uuid(),
  account_id: z.string().uuid(),
});
