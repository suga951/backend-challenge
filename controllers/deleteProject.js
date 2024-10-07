import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteProject = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });
    res.status(202).json({
      message: "Project successfully deleted",
      deletedProject: deletedProject,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." });
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteProject;
