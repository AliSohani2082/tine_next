import { z } from "zod";

// ============================================================
// user
// ============================================================

export const email = z
  .string()
  .email({ message: "ایمیل معتبر نیست" })
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(10, { message: "پسورد باید حداقل دارای ۱۰ کاراکتر باشد" })
  .max(100, { message: "پسورد باید دارای حداکثر ۱۰۰ کاراکتر باشد" })
  .transform((str) => str.trim());

export const Signup = z
  .object({
    name: z.string().min(2, { message: "نام باید حداقل دارای ۲ کاراکتر باشد" }),
    username: z
      .string()
      .min(2, { message: "نام باید حداقل دارای ۲ کاراکتر باشد" }),
    email: z.string().email(),
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "پسورد ها همخوانی ندارند",
    path: ["passwordConfirmation"],
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
    message: "پسورد ها همخوانی ندارند",
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
  name: z.string().min(2, { message: "نام باید حداقل دارای ۲ کاراکتر باشد" }),
  query: z.string().min(2, { message: "نام باید حداقل دارای ۲ کاراکتر باشد" }),
});
