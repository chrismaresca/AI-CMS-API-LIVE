"use server";

import { createArticleWithTags } from "@/data/articles/articles.transaction";

// Form Schema
import { createArticleSchema } from "@/forms/article";

// GCS Client
import { saveFileToGCS } from "@/lib/gcs/functions";

// Constants
import { DEFAULT_BUCKET_NAME } from "@/constants";

export type createArticleReturnType = {
  success: boolean;
  message: string;
};

export async function createArticleAction(formData: { title: string; excerpt: string; content: string; images: File[]; authorId: string; brandId: string; tagIds: string[] }): Promise<createArticleReturnType> {
  // Parse and validate the data
  const parseResult = createArticleSchema.safeParse({
    title: formData.title,
    excerpt: formData.excerpt,
    content: formData.content,
    images: [], // Will be handled separately
    authorId: formData.authorId,
    brandId: formData.brandId,
    tagIds: formData.tagIds,
  });

  if (!parseResult.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  let updatedContent = formData.content;
  const uploadedImageUrls: string[] = [];

  // Handle image uploads first before creating article
  try {
    for (const file of formData.images) {
      const fileName = file.name;

      // encode the file name
      const encodedFileName = encodeURIComponent(fileName);
      const cleanedFileName = fileName.replace(/\s+/g, "-").toLowerCase();

      const folderName = formData.title.replace(/\s+/g, "-").toLowerCase();

      const fileUrl = await saveFileToGCS(DEFAULT_BUCKET_NAME, folderName, cleanedFileName, file);

      // Store uploaded URL
      uploadedImageUrls.push(fileUrl);

      // Replace image placeholders in content with actual GCS URLs
      updatedContent = updatedContent.replace(new RegExp(`!\\[.*?\\]\\(.*?${encodedFileName}\\)`, "g"), `![image](${fileUrl})`);
    }
  } catch (uploadError) {
    console.error("Error uploading images:", uploadError);
    return {
      success: false,
      message: "Failed to upload images to GCS",
    };
  }

  // Prepare final data for article creation
  const articleData = {
    ...parseResult.data,
    content: updatedContent,
    imageUrls: uploadedImageUrls,
  };

  try {
    await createArticleWithTags(articleData);
    return {
      success: true,
      message: "Article created successfully",
    };
  } catch (articleError) {
    console.error("Error creating article:", articleError);
    return {
      success: false,
      message: `Failed to create article: ${articleError}`,
    };
  }
}
