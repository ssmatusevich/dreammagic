import { z } from "zod";

const name = z.string().trim().min(2).max(100);
const email = z.email().max(160);
const message = z.string().trim().min(10).max(2000);
const honeypot = z.string().max(0).optional().default("");

export const inquirySchema = z.object({
  name,
  email,
  message,
  honeypot,
  artworkSlug: z.string().trim().min(1).max(120),
  type: z.enum(["inquire", "request_viewing"]),
});

export const contactSchema = z.object({
  name,
  email,
  message,
  honeypot,
});

export const visitSchema = z.object({
  name,
  email,
  preferredDate: z.string().trim().min(2).max(80),
  message: z.string().trim().max(2000).optional().default(""),
  honeypot,
});

