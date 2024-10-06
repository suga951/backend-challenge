import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProjectById = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        projectManager: true,
        ProjectAssign: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const formattedProject = {
      ...project,
      projectManager: {
        id: project.projectManager?.id,
        name: project.projectManager?.name,
        email: project.projectManager?.email,
      },
      users: project.ProjectAssign.map((assignment) => ({
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
        role: assignment.role,
      })),
    };
    res.json(formattedProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
export default getProjectById;
