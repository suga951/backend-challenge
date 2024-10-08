/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided name, description, status, and project manager.
 *     tags:
 *       - Project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the project.
 *               description:
 *                 type: string
 *                 description: The description of the project.
 *               status:
 *                 type: string
 *                 description: The status of the project (defaults to "Ongoing").
 *               projectManagerId:
 *                 type: integer
 *                 description: The ID of the project manager.
 *           example:
 *             name: "New Project"
 *             description: "This is a new project."
 *             status: "Ongoing"
 *             projectManagerId: 1
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *                 name: "New Project"
 *                 description: "This is a new project."
 *                 status: "Ongoing"
 *                 projectManagerId: 1
 *                 createdAt: "2023-10-07T12:00:00.000Z"
 *                 updatedAt: "2023-10-07T12:00:00.000Z"
 *       400:
 *         description: Name required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Name required."
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
