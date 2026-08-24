import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),

    phone: z
      .string()
      .optional(),

    role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"], {
      message: "Please select your role",
    }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
