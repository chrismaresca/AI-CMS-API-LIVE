import { ArticlePayload } from "./articles/article.types";
import { Author } from "./authors/author.types";
import { Brand } from "./brands/brand.types";
import { LinkedInPost } from "./linkedin-posts/linkedin-post.types";
import { Tag } from "./tags/tag.types";
import { TweetPost } from "./tweet-posts/tweet-post.types";
import { XmlBlockPayload } from "./xml-blocks/xml-blocks.types";

export type ResourceDataMap = {
  articles: ArticlePayload;
  authors: Author;
  brands: Brand;
  linkedinPosts: LinkedInPost;
  tags: Tag;
  tweetPosts: TweetPost;
  xmlBlocks: XmlBlockPayload;
};

export type Resource = keyof ResourceDataMap;
