import Joi from "joi";

export const projectSchemas = {
  // Schema for creating/updating a project
  projectSchema: Joi.object({
    name: Joi.string().required().max(255).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name cannot be longer than 255 characters",
      "any.required": "Name is required",
    }),
    description: Joi.string().required().max(1000).messages({
      "string.base": "Description must be a string",
      "string.empty": "Description is required",
      "string.max": "Description cannot be longer than 1000 characters",
      "any.required": "Description is required",
    }),
    status: Joi.string().max(50).default("Ongoing").messages({
      "string.base": "Status must be a string",
      "string.max": "Status cannot be longer than 50 characters",
    }),
    projectManagerId: Joi.number().integer().positive().required().messages({
      "number.base": "Project manager ID must be a number",
      "number.integer": "Project manager ID must be an integer",
      "number.positive": "Project manager ID must be a positive number",
      "any.required": "Project manager ID is required",
    }),
  }),

  // Schema for pagination and search query parameters
  querySchema: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be greater than 0",
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be greater than 0",
      "number.max": "Limit cannot be greater than 100",
    }),
    search: Joi.string().allow("").max(255).messages({
      "string.base": "Search must be a string",
      "string.max": "Search cannot be longer than 255 characters",
    }),
    status: Joi.string().max(50).messages({
      "string.base": "Status filter must be a string",
      "string.max": "Status filter cannot be longer than 50 characters",
    }),
    projectManagerId: Joi.number().integer().positive().messages({
      "number.base": "Project manager ID filter must be a number",
      "number.integer": "Project manager ID filter must be an integer",
      "number.positive": "Project manager ID filter must be a positive number",
    }),
  }),

  // Schema for assigning users to a project
  projectAssignSchema: Joi.object({
    userId: Joi.number().integer().positive().required().messages({
      "number.base": "User ID must be a number",
      "number.integer": "User ID must be an integer",
      "number.positive": "User ID must be a positive number",
      "any.required": "User ID is required",
    }),
    role: Joi.string().default("Member").messages({
      "string.base": "Role must be a string",
    }),
  }),

  // Schema for bulk assigning users to a project
  bulkProjectAssignSchema: Joi.object({
    assignments: Joi.array()
      .items(
        Joi.object({
          userId: Joi.number().integer().positive().required().messages({
            "number.base": "User ID must be a number",
            "number.integer": "User ID must be an integer",
            "number.positive": "User ID must be a positive number",
            "any.required": "User ID is required",
          }),
          role: Joi.string().default("Member").messages({
            "string.base": "Role must be a string",
          }),
        }),
      )
      .min(1)
      .required()
      .messages({
        "array.base": "Assignments must be an array",
        "array.min": "At least one assignment is required",
        "any.required": "Assignments are required",
      }),
  }),

  // Schema for URL parameters (like project ID)
  idParamSchema: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": "ID must be a number",
      "number.integer": "ID must be an integer",
      "number.positive": "ID must be a positive number",
      "any.required": "ID is required",
    }),
  }),
};
