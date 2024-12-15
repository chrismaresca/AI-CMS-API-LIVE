# Project Title

## Overview
This project is a content management system (CMS) designed to manage articles, brands, and authors. It provides a RESTful API for creating, updating, retrieving, and deleting articles, as well as managing associated data such as authors and brands.

## Features
- **Article Management**: Create, update, retrieve, and delete articles.
- **Brand Management**: Manage brands associated with articles.
- **Author Management**: Manage authors who write articles.
- **Tagging System**: Tag articles for better categorization and searchability.
- **Publish Status**: Control the publish status of articles (draft, in-review, scheduled, published, archived).

## API Endpoints
### Articles
- `GET /api/articles`: Retrieve all articles.
- `GET /api/articles/:id`: Retrieve a single article by ID.
- `POST /api/articles`: Create a new article.
- `PATCH /api/articles/:id`: Update an existing article by ID.
- `DELETE /api/articles/:id`: Delete an article by ID.

### Brands
- `GET /api/brands`: Retrieve all brands.
- `GET /api/brands/:id`: Retrieve a single brand by ID.
- `POST /api/brands`: Create a new brand.
- `PATCH /api/brands/:id`: Update an existing brand by ID.
- `DELETE /api/brands/:id`: Delete a brand by ID.

### Authors
- `GET /api/authors`: Retrieve all authors.
- `GET /api/authors/:id`: Retrieve a single author by ID.
- `POST /api/authors`: Create a new author.
- `PATCH /api/authors/:id`: Update an existing author by ID.
- `DELETE /api/authors/:id`: Delete an author by ID.

## Database Schema
The project uses Drizzle ORM with PostgreSQL as the database. The main tables include:
- **Articles**: Stores article details including title, content, excerpt, slug, author ID, brand ID, and publish status.
- **Authors**: Stores author details including name, email, title, and bio.
- **Brands**: Stores brand details including name and social media links.
- **Tags**: Stores tags for categorizing articles.

## Getting Started
1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Set up the database and run migrations.
4. Run the developments server using `pnpm dev`.

## Building the project
1. Run the build command using `pnpm build`.
2. Run the production server using `pnpm start`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
