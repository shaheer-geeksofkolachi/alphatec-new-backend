export enum CatalogueSuccessMessages {
  CREATED = "Catalogue item created successfully",
  RETRIEVED = "Catalogue item retrieved successfully",
  RETRIEVED_ALL = "Catalogue items retrieved successfully",
  UPDATED = "Catalogue item updated successfully",
  DELETED = "Catalogue item deleted successfully",
}

export enum CatalogueErrorMessages {
  NOT_FOUND = "Catalogue item not found",
  ALREADY_EXISTS = "Catalogue item with this part number already exists",
  UNAUTHORIZED = "Unauthorized access to catalogue item",
  INVALID_CATEGORY = "Invalid category ID",
}
