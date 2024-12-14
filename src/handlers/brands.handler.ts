// Handlers for brand-specific operations

// Types
import { Brand, CreateBrandRequest, GetAllBrandsResponse, GetBrandResponse, UpdateBrandRequest } from "@/types";

// Brand Data Layer
import { createBrand, findAllBrands, findBrandById, updateBrand, deleteBrand } from "@/data/brands";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

export async function handleGetById(id: string): Promise<GetBrandResponse> {
  const brand = await findBrandById(id);

  if (!brand) {
    throw new ResourceNotFoundError("Brand not found");
  }

  return { doc: brand };
}

export async function handleGetAll(queryParams: string): Promise<GetAllBrandsResponse> {
  const { docs, total } = await findAllBrands();
  return {
    docs,
    totalDocs: total,
    limit: 10,
    totalPages: Math.ceil(total / 10),
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: total > 10,
    prevPage: null,
    nextPage: total > 10 ? 2 : null,
  };
}

export async function handleCreate(data: CreateBrandRequest): Promise<Brand> {
  const newBrand = await createBrand(data);
  return newBrand;
}

export async function handleUpdate(id: string, data: UpdateBrandRequest): Promise<Brand> {
  const updatedBrand = await updateBrand(id, data);

  if (!updatedBrand) {
    throw new ResourceNotFoundError("Brand not found");
  }

  return updatedBrand;
}

export async function handleDelete(id: string): Promise<boolean> {
  return await deleteBrand(id);
}
