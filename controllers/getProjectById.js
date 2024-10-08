/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     description: Fetches a single project, including its manager and assigned users.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A project object with its details
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
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 projectManager:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Project not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Something went wrong"
 */

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
