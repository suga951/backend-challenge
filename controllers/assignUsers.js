/**
 * @swagger
 * /projects/{id}/assign-users:
 *   post:
 *     summary: Assign one or more users to a project
 *     description: Assigns multiple users to a project by providing their user IDs.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to assign users to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of user IDs to assign to the project.
 *             example:
 *               user_ids: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Users assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message with user IDs and project ID.
 *               example:
 *                 message: "Users, [1, 2, 3], assigned successfully to project: 123"
 *       400:
 *         description: Invalid input, such as missing or invalid user IDs array.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *               example:
 *                 error: "User IDs must be an array of user IDs"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *               example:
 *                 error: "Something went wrong."
 */

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
