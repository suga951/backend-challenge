import getProjectById from "./getProjectById.js";

class ProjectController {
  getProjectById(req, res) {
    return getProjectById(req, res);
  }
}
export default new ProjectController();

// export const projectController = () => {
//   const createProject = async (req, res) => {
//     const { name, description, status } = req.body;
//
//     try {
//       if (!name) {
//         return res.status(400).json({ error: "Project name is required" });
//       }
//       const newProject = await prisma.project.create({
//         data: {
//           name,
//           description,
//           status,
//         },
//       });
//       res.status(201).json(newProject);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Something went wrong" });
//     } finally {
//       await prisma.$disconnect();
//     }
//   };
// };
