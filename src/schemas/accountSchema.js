import z from "zod";

export const accountSchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: "El nombre debe ser una cadena de texto.",
      required_error: "El nombre es obligatorio.",
    })
    .min(1),
  user_id: z.string().uuid(),
  color_hex: z.string(7, {
    invalid_type_error: "color_hex debe ser una cadena de texto.",
    required_error: "color_hex es obligatorio.",
  }),
  currency_name: z.string(30, {
    invalid_type_error: "currency_name debe ser una cadena de texto.",
    required_error: "currency_name es obligatorio.",
  }),
  currency_code: z.string(3, {
    invalid_type_error: "currency_code debe ser una cadena de texto.",
    required_error: "currency_code es obligatorio.",
  }),
  icon_url: z.string(255, {
    invalid_type_error: "icon_url debe ser una cadena de texto.",
    required_error: "icon_url es obligatorio.",
  })
});
