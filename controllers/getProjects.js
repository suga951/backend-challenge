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
