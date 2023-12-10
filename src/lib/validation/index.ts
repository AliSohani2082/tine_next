import { z } from "zod";

// ============================================================
// user
// ============================================================

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim());

export const Signup = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });

export const Login = z.object({
  email: z.string().email(),
  password: password,
});

export const ForgotPassword = z.object({
  email,
});

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
});

// ============================================================
// database
// ============================================================
export const CreateDatabase = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  query: z.string().min(2, { message: "Query must be at least 2 characters." }),
});
