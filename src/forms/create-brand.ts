// Zod
import { z } from "zod";

// Form Schema
export const brandFormSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters").max(50, "Brand name must be at most 50 characters"),
  founder: z.string().min(2, "Founder name must be at least 2 characters").max(50, "Founder name must be at most 50 characters"),
  description: z.string().min(2, "Brand description must be at least 2 characters").max(500, "Brand description must be at most 500 characters"),
  websiteUrl: z.string().url("Invalid website URL"),
  linkedInHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  createdTags: z.array(z.object({ name: z.string() })),
});

// Default Values
export const brandFormDefaultValues = {
  name: "",
  founder: "",
  description: "",
  websiteUrl: "",
  linkedInHandle: "",
  twitterHandle: "",
  createdTags: [],
};
