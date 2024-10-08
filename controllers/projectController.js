import getProjectById from "./getProjectById.js";
import createProject from "./createProject.js";
import updateProject from "./updateProject.js";
import deleteProject from "./deleteProject.js";
import assignUsers from "./assignUsers.js";
import getProjects from "./getProjects.js";

class ProjectController {
  getProjects(req, res) {
    return getProjects(req, res);
  }
  createProject(req, res) {
    return createProject(req, res);
  }
  getProjectById(req, res) {
    return getProjectById(req, res);
  }
  updateProject(req, res) {
    return updateProject(req, res);
  }
  deleteProject(req, res) {
    return deleteProject(req, res);
  }
  assignUsers(req, res) {
    return assignUsers(req, res);
  }
}
export default new ProjectController();
