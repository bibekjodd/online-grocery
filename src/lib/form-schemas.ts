import z from 'zod';

const emailSchema = z.string().email().max(40, 'Too long email');
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(20, "Password can't exceed 20 characters");
const phoneSchema = z
  .preprocess((val) => Number(val) || undefined, z.number().optional())
  .refine((phone) => {
    if (!phone) return true;
    return String(phone).length === 10;
  }, 'Invalid phone number');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(4, 'Too short name').max(30, 'Too long name'),
  phone: phoneSchema
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().min(4, 'Too short name').max(30, 'Too long name'),
  phone: phoneSchema
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const requestLoginOtpSchema = z.object({
  email: emailSchema
});
export type RequestLoginOtpSchema = z.infer<typeof requestLoginOtpSchema>;

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, "Password can't exceed 20 characters"),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, "Password can't exceed 20 characters")
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password did not match',
    path: ['confirmPassword']
  });
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
