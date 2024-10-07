import getProjectById from "./getProjectById.js";
import createProject from "./createProject.js";

class ProjectController {
  createProject(req, res) {
    return createProject(req, res);
  }
  getProjectById(req, res) {
    return getProjectById(req, res);
  }
}
export default new ProjectController();
