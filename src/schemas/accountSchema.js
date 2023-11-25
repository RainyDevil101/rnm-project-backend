import z from "zod";

export const accountSchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: "Name must be a string.",
      required_error: "Name is required.",
    })
    .min(1),
  user_id: z.string().uuid(),
  color_hex: z.string(7, {
    invalid_type_error: "Color_hex must be a string.",
    required_error: "Color_hex is required.",
  }),
  currency_name: z.string(30, {
    invalid_type_error: "Currency_name must be a string.",
    required_error: "Currency_name is required.",
  }),
  currency_code: z.string(3, {
    invalid_type_error: "Currency_code must be a string.",
    required_error: "Currency_code is required.",
  }),
  icon_url: z.string(255, {
    invalid_type_error: "Icon_url must be a string.",
    required_error: "Icon_url is required.",
  })
});
