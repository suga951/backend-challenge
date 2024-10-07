import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateProject = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const { name, description, status } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
        status,
      },
    });
    res.status(200).json(updatedProject);
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
};

export default updateProject;
