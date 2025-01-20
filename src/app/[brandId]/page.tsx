import React from "react";

// Data
import { findBrandById } from "@/data/brands/brands.simple";
import { findAllArticlesByBrandId } from "@/data/articles/articles.queries";

// Components
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Types
import { ArticlePayload } from "@/types";
import DeleteArticleDialog from "@/components/articles/DeleteArticleDialog";

interface ArticleCardProps {
  article: ArticlePayload;
  brandId: string;
}

type NextParams = {
  params: Promise<{ brandId: string }>;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, brandId }) => {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{article.title}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {article.author.firstName} {article.author.lastName}
              </span>
              <Badge className="text-[10px] py-0.5" variant={article.author.isHuman ? "default" : "secondary"}>
                {article.author.isHuman ? "Human" : "AI"}
              </Badge>
            </div>
          </div>
          <Badge variant={article.publishStatus === "published" ? "default" : "secondary"}>{article.publishStatus}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Created: {new Date(article.dateCreated).toLocaleDateString()}
          {article.dateUpdated && ` • Updated: ${new Date(article.dateUpdated).toLocaleDateString()}`}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${brandId}/${article.id}`}>Edit</Link>
          </Button>
          {/*  Start Delete Article Dialog */}
          <DeleteArticleDialog articleId={article.id} />
          {/*   End Delete Article Dialog */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default async function Page({ params }: NextParams) {
  const { brandId } = await params;

  const [brand, articles] = await Promise.all([findBrandById(brandId), findAllArticlesByBrandId(brandId)]);

  if (!brand || !articles) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-2 mb-8">
        <Button variant="ghost" asChild className="self-start -ml-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to All Brands
          </Link>
        </Button>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{brand.name} Articles</h1>
          <Button asChild>
            <Link href={`/${brandId}/new`}>Create New Article</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} brandId={brandId} />
        ))}
      </div>
    </div>
  );
}
