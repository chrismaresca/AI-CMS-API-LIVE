import React from "react";
import Link from "next/link";

// Data
import { findAllBrands } from "@/data/brands/brands.simple";

// Components
import { CreateBrandDialog } from "@/components/brands/CreateBrandDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
import { Brand } from "@/types";

interface BrandCardProps {
  brand: Brand;
}


const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle className="text-xl">{brand.name}</CardTitle>
          <p className="text-sm text-muted-foreground">Founded by {brand.founder}</p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground">{brand.description || "No description available"}</p>

        <div className="flex flex-wrap gap-2">
          {brand.websiteUrl && (
            <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Badge variant="secondary" className="cursor-pointer bg-black/80 text-white hover:bg-black/70">
                Website
              </Badge>
            </a>
          )}
          {brand.linkedInHandle && (
            <a href={`https://linkedin.com/in/${brand.linkedInHandle}`} target="_blank" rel="noopener noreferrer">
              <Badge variant="default" className="bg-[#0077B5] hover:bg-[#0077B5]/80 cursor-pointer">
                LinkedIn
              </Badge>
            </a>
          )}
          {brand.twitterHandle && (
            <a href={`https://twitter.com/${brand.twitterHandle}`} target="_blank" rel="noopener noreferrer">
              <Badge variant="default" className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 cursor-pointer">
                Twitter
              </Badge>
            </a>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Created: {brand.dateCreated.toLocaleDateString()}
          {brand.dateUpdated && ` • Updated: ${brand.dateUpdated.toLocaleDateString()}`}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/${brand.id}`}>View Brand</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default async function Page() {
  const { docs: brands } = await findAllBrands();

  if (!brands) {
    throw new Error("Failed to fetch brands");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Brands Dashboard</h1>
        <CreateBrandDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
