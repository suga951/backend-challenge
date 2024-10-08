/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Updates a project by its ID with new name, description, and status.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the project.
 *               description:
 *                 type: string
 *                 description: The new description of the project.
 *               status:
 *                 type: string
 *                 description: The new status of the project.
 *           example:
 *             name: "Updated Project Name"
 *             description: "Updated description for the project"
 *             status: "Completed"
 *     responses:
 *       200:
 *         description: Project successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 projectManagerId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *               example:
 *                 id: 1
 *                 name: "Updated Project Name"
 *                 description: "Updated description for the project"
 *                 status: "Completed"
 *                 projectManagerId: 1
 *                 createdAt: "2023-10-01T00:00:00.000Z"
 *                 updatedAt: "2023-10-07T12:00:00.000Z"
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
