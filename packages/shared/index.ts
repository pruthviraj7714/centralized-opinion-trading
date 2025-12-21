import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(6, { error: "Username Should be at least of 6 characters" }),
  password: z
    .string()
    .min(8, { error: "Password Should be at least of 8 characters" }),
  email: z.email({ error: "Email should be valid" }),
});

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const CreateMarketSchema = z.object({
  opinion: z
    .string()
    .min(6, { error: "Opinion should be at least of 6 characters" }),
  description: z
    .string()
    .min(5, { error: "Description should be at least of 15 characters" }),
  status: z.enum(["OPEN", "CLOSED", "RESOLVED"], { error: "Invalid Status" }),
  expiryTime: z.date({ error: "Invalid Date" }),
  resolvedOutcome: z.enum(["YES", "NO"], { error: "Invalid Outcome" }),
});
