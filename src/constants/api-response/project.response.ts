export enum ProjectSuccessMessages {
  CREATED = "Project created successfully",
  RETRIEVED = "Project retrieved successfully",
  RETRIEVED_ALL = "Projects retrieved successfully",
  UPDATED = "Project updated successfully",
  DELETED = "Project deleted successfully",
  STATUS_UPDATED = "Project status updated successfully",
  FINANCIAL_STATUS_UPDATED = "Project financial status updated successfully",
}

export enum ProjectErrorMessages {
  NOT_FOUND = "Project not found",
  ALREADY_EXISTS = "Project with this code already exists",
  INVALID_CLIENT = "Invalid client ID",
  INVALID_STATUS = "Invalid project status",
  INVALID_FINANCIAL_STATUS = "Invalid financial status",
  UNAUTHORIZED = "Unauthorized access to project",
}
