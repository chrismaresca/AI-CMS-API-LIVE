import React from "react";

// Data
import { findBrandById } from "@/data/brands/brands.simple";
import { findAllAuthors } from "@/data/authors/authors.queries";
import { findArticleById } from "@/data/articles/articles.queries";
import { findAllTagsByBrandId } from "@/data/tags/tags.queries";

// Components
import ArticleForm from "@/components/ArticleDash";
import { notFound } from "next/navigation";

type NextParams = {
  params: Promise<{ brandId: string, articleId: string }>;
};

export default async function Page({ params }: NextParams) {
  const { brandId, articleId } = await params;

  const [brand, article, { docs: authors }, { docs: tags }] = await Promise.all([
    findBrandById(brandId),
    findArticleById(articleId),
    findAllAuthors(),
    findAllTagsByBrandId(brandId)
  ]);

  if (!brand || !article || !tags) {
    return notFound();
  }

  return <ArticleForm brand={brand} authors={authors} tags={tags} existingArticle={article} />;
}
