import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProject = async (req, res) => {
  try {
    const { name, description, status, projectManagerId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required." });
    }
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: status || "Ongoing",
        projectManagerId,
      },
    });

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." });
  } finally {
    await prisma.$disconnect();
  }
};

export default createProject;
