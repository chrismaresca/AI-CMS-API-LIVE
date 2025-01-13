// React Imports
import React from "react";

// Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Article Editor Props
interface ArticleEditorProps {
  formData: {
    title: string;
    excerpt: string;
    content: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: (data: any) => void;
  errors: Record<string, string>;
}

// Constants

// Title
const TITLE_LABEL = "Title";
const TITLE_PLACEHOLDER = "Enter a compelling title...";

// Excerpt
const EXCERPT_LABEL = "Excerpt";
const EXCERPT_PLACEHOLDER = "Write a brief, engaging summary...";

// Content
const CONTENT_LABEL = "Content";
const CONTENT_PLACEHOLDER = "Write your article content...";

// Internal Components
export const ArticleEditor: React.FC<ArticleEditorProps> = ({ formData, setFormData, errors }) => (
  <div className="space-y-6">
    <div className="rounded-lg bg-white p-8 shadow-md border border-gray-100">
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold text-gray-900">{TITLE_LABEL}</Label>
          <Input 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={TITLE_PLACEHOLDER} 
            className="mt-2 text-lg"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <Label className="text-base font-semibold text-gray-900">{EXCERPT_LABEL}</Label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder={EXCERPT_PLACEHOLDER}
            className="mt-2 h-32 text-base"
          />
          {errors.excerpt && <p className="text-sm text-red-500 mt-1">{errors.excerpt}</p>}
        </div>

        <div>
          <Label className="text-base font-semibold text-gray-900">{CONTENT_LABEL}</Label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder={CONTENT_PLACEHOLDER}
            className="mt-2 min-h-[500px] text-base font-serif"
          />
          {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
        </div>
      </div>
    </div>
  </div>
);
