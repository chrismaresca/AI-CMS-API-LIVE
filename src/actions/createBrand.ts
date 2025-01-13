"use server";

import { brandFormSchema } from "@/forms/create-brand";
import { createBrandWithTags } from "@/data/brands/brands.transactions";
import { CreateBrandWithTagsRequest } from "@/types";

export type createBrandReturnType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any;
  success: boolean;
  message: string;
  zodErrors: Record<string, string[]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBrandAction(prevState: any, formData: FormData): Promise<createBrandReturnType> {
  //   Parse the form data

  const parseResult = brandFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    websiteUrl: formData.get("websiteUrl"),
    founder: formData.get("founder"),
    linkedInHandle: formData.get("linkedInHandle"),
    twitterHandle: formData.get("twitterHandle"),
    createdTags: formData.getAll("createdTags").map((tag) => ({ name: String(tag) })),
  });

  //   Check if the validation is successful
  if (!parseResult.success) {
    return {
      ...prevState,
      success: false,
      zodErrors: parseResult.error.flatten().fieldErrors,
      message: "Missing required fields. Faield to create brand",
    };
  }

  try {
    // Create the payload
    const payload: CreateBrandWithTagsRequest = {
      ...parseResult.data,
    };

    // Create brand with tags
    await createBrandWithTags(payload);
    return {
      ...prevState,
      success: true,
      zodErrors: {},
      message: "Brand created successfully",
    };
  } catch (error) {
    return {
      ...prevState,
      success: false,
      zodErrors: {},
      message: "Failed to create brand: " + error,
    };
  }
}
