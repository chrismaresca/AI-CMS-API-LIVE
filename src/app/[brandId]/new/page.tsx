import React from "react";

// Data
import { findBrandById } from "@/data/brands/brands.simple";
import { findAllAuthors } from "@/data/authors/authors.queries";

// Components
import ArticleForm from "@/components/ArticleDash";
import { findAllTagsByBrandId } from "@/data/tags/tags.queries";
import { notFound } from "next/navigation";

type NextParams = {
  params: Promise<{ brandId: string }>;
};

// This is the [brand]/new/page.tsx...I need to get the brand ID from the params and then get the brand, authors, and tags from the database

export default async function Page({ params }: NextParams) {
  const { brandId } = await params;

  const brand = await findBrandById(brandId);

  if (!brand) {
    return notFound();
  }

  const { docs: authors } = await findAllAuthors();
  const { docs: tags } = await findAllTagsByBrandId(brandId);

  if (!tags) {
    return notFound();
  }

  return <ArticleForm brand={brand} authors={authors} tags={tags} existingArticle={undefined} />;
}
