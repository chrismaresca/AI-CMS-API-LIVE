'use server';

import { deleteArticle } from "@/data/articles/articles.simple";

interface DeleteArticleResponse {
  success: boolean;
  message: string;
}

export async function deleteArticleAction(articleId: string): Promise<DeleteArticleResponse> {
  const response = await deleteArticle(articleId);

  if (response) {
    return { success: true, message: "Article deleted successfully" };
  } else {
    return { success: false, message: "Failed to delete article" };
  }
}
