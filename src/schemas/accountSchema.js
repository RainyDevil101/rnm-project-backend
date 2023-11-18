import z from "zod";

export const accountSchema = z.object({
  name: z
    .string(45, {
      invalid_type_error: "Name must be a string.",
      required_error: "Name is required.",
    })
    .min(5),
  user_id: z.string().uuid(),
  icon_name: z.string(30, {
    invalid_type_error: "Icon_name must be a string.",
    required_error: "Icon_name is required.",
  }),
  color_hex: z.string(7, {
    invalid_type_error: "Color_hex must be a string.",
    required_error: "Color_hex is required.",
  })
});
