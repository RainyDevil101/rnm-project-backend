import z from "zod";

export const userCategorySchema = z.object({
  user_id: z
    .string({
      invalid_type_error: "User_id must be a string.",
      required_error: "User_id is required.",
    })
    .uuid(),
  category_id: z.string({
    invalid_type_error: "Category_id must be a string.",
    required_error: "Category_id is required.",
  })
    .uuid(),
});
