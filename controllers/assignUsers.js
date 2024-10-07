import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const asignUsers = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const { user_ids } = req.body;

    if (!Array.isArray(user_ids) || user_ids.length === 0) {
      return res
        .status(400)
        .json({ error: "User IDs must be an array of user IDs" });
    }
    await prisma.projectAssign.createMany({
      data: user_ids.map((userId) => ({
        userId: userId,
        projectId: projectId,
        role: "Member",
      })),
      skipDuplicates: true,
    });
    res.status(201).json({
      message: `Users, ${user_ids}, assigned successfully to project: ${projectId}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." });
  } finally {
    await prisma.$disconnect();
  }
};

export default asignUsers;
