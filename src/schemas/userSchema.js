import z from "zod";
import { getValidRoles } from "../utils/getValidRoles.js";

const validRoles = await getValidRoles();

export const userSchema = z.object({
    username: z
        .string(45, {
            invalid_type_error: "Username must be a string.",
            required_error: "Username is required.",
        })
        .min(1),
    password: z
        .string({
            invalid_type_error: "Password must be a string.",
            required_error: "Password is required.",
        })
        .min(10)
        .max(255),
    email: z
        .string(45, {
            required_error: "Email is required.",
        })
        .min(5)
        .email({
            message: "Email not valid.",
        }),
    role_id: z
        .string({
            invalid_type_error: "Role must be a string.",
            required_error: "Role is required.",
        })
        .uuid()
        .refine((value) => validRoles.includes(value), {
            message: "Invalid role id.",
        }),
});
