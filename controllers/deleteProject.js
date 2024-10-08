/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Deletes a project by its ID.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to delete.
 *     responses:
 *       202:
 *         description: Project successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 deletedProject:
 *                   type: object
 *                   description: The deleted project object.
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     projectManagerId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *               example:
 *                 message: "Project successfully deleted"
 *                 deletedProject:
 *                   id: 1
 *                   name: "Project A"
 *                   description: "Description of Project A"
 *                   status: "Ongoing"
 *                   projectManagerId: 1
 *                   createdAt: "2023-10-01T00:00:00.000Z"
 *                   updatedAt: "2023-10-05T12:00:00.000Z"
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
