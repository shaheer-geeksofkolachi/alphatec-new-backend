export enum ClientSuccessMessages {
  CREATED = "Client created successfully",
  RETRIEVED = "Client retrieved successfully",
  RETRIEVED_ALL = "Clients retrieved successfully",
  UPDATED = "Client updated successfully",
  DELETED = "Client deleted successfully",
}

export enum ClientErrorMessages {
  NOT_FOUND = "Client not found",
  ALREADY_EXISTS = "Client with this company name already exists",
  INVALID_CIF = "Invalid CIF/NIT format",
  UNAUTHORIZED = "Unauthorized access to client",
}
