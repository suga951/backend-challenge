import { Router } from "express";
import ProjectController from "../controllers/projectController.js";
import { projectSchemas } from "../validations/projectValidations.js";
import { validateRequest } from "../middleware/validateRequest.js";

export const projectRouter = () => {
  const router = Router();
  router.param("id", validateRequest(projectSchemas.idParamSchema, "params"));

  router.get("/projects/:id", ProjectController.getProjectById);

  return router;
};
