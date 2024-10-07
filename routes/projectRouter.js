import { Router } from "express";
import ProjectController from "../controllers/projectController.js";
import { projectSchemas } from "../validations/projectValidations.js";
import { validateRequest } from "../middleware/validateRequest.js";

export const projectRouter = () => {
  const router = Router();
  router.param("id", validateRequest(projectSchemas.idParamSchema, "params"));

  router.get("/projects/:id", ProjectController.getProjectById);
  router.post(
    "/projects",
    validateRequest(projectSchemas.projectSchema, "body"),
    ProjectController.createProject,
  );
  router.put(
    "/projects/:id",
    validateRequest(projectSchemas.projectSchema, "body"),
    ProjectController.updateProject,
  );
  router.delete(
    "/projects/:id",
    validateRequest(projectSchemas.idParamSchema, "params"),
    ProjectController.deleteProject,
  );

  return router;
};
