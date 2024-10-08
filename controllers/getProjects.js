/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     description: Fetches a list of projects with pagination and search functionality.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (defaults to 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of projects to return per page (defaults to 10).
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search term to filter projects by name or description.
 *         schema:
 *           type: string
 *           example: "Project"
 *     responses:
 *       200:
 *         description: A list of projects with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       users:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             email:
 *                               type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *       204:
 *         description: No data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "No data found."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Something went wrong."
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        }
      : {};

    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          ProjectAssign: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.project.count({ where }),
    ]);

    const formattedProjects = projects.map((project) => ({
      ...project,
      users: project.ProjectAssign.map((up) => up.user),
    }));

    if (formattedProjects.length === 0) {
      res.status(204).json({ message: "No data found." });
    }

    res.status(200).json({
      data: formattedProjects,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        current_page: page,
      },
    });
  } catch (err) {
    console.log(err);
    res.json(500).json({ error: "Something went wrong." });
  } finally {
    await prisma.$disconnect();
  }
};

export default getProjects;
