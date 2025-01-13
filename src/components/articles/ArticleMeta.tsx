"use client"

import React from "react";

// Types
import { Brand } from "@/types/brands/brand.types";
import { Author } from "@/types/authors/author.types";
import { Tag } from "@/types/tags/tag.types";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Constants
const BRAND_LABEL = "Brand";
const AUTHOR_LABEL = "Author";
const UPLOAD_FOLDER_LABEL = "Upload Folder";
const TAGS_LABEL = "Tags";
const SAVE_BUTTON_LABEL_NEW = "Save Article";
const SAVE_BUTTON_LABEL_UPDATE = "Update Article";

interface ArticleMetaProps {
  formData: {
    authorId: string;
    images: File[];
    tagIds: string[];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: (data: any) => void;
  brand: Brand;
  authors: Author[];
  tags: Tag[];
  isEdit: boolean;
  errors: Record<string, string>;
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({ 
  formData, 
  setFormData,
  brand, 
  authors, 
  tags, 
  isEdit,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md border border-gray-100">
        <div className="space-y-6">
          {/* Start Brand */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">{BRAND_LABEL}</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm font-medium text-gray-900">{brand?.name}</div>
            <input type="hidden" name="brandId" value={brand.id} />
          </div>
          {/* End Brand */}

          {/* Start Author */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">{AUTHOR_LABEL}</Label>
            <Select 
              onValueChange={(value) => setFormData({ ...formData, authorId: value })} 
              value={formData.authorId}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.firstName} {author.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.authorId && <p className="text-sm text-red-500 mt-1">{errors.authorId}</p>}
          </div>
          {/* End Author */}

          {/* Start Upload Folder */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">{UPLOAD_FOLDER_LABEL}</Label>
            <Input
              type="file"
              className="mt-2"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  console.log("The files are: ", files);
                  setFormData({ ...formData, images: Array.from(files) });
                }
              }}
              {...({ webkitdirectory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)}
            />
            {errors.images && <p className="text-sm text-red-500 mt-1">{errors.images}</p>}
          </div>
          {/* End Upload Folder */}

          {/* Start Tags */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">{TAGS_LABEL}</Label>
            <Select onValueChange={(value) => {
              const updatedTags = [...(formData.tagIds || []), value];
              setFormData({ ...formData, tagIds: updatedTags });
            }}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.tagIds?.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return tag ? (
                  <Badge 
                    key={tag.id} 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => {
                      const updatedTags = formData.tagIds?.filter(id => id !== tag.id);
                      setFormData({ ...formData, tagIds: updatedTags });
                    }}
                  >
                    {tag.name} ×
                  </Badge>
                ) : null;
              })}
            </div>
            {errors.tagIds && <p className="text-sm text-red-500 mt-1">{errors.tagIds}</p>}
          </div>
          {/* End Tags */}
        </div>
      </div>

      {/* Start Save Button */}
      <Button type="submit" variant="default" className="w-full mt-8 py-6 text-base font-medium">
        {isEdit ? SAVE_BUTTON_LABEL_UPDATE : SAVE_BUTTON_LABEL_NEW}
      </Button>
      {/* End Save Button */}
    </div>
  );
};
