import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Challenge Backend API",
      version: "1.0.0",
      description: "Express API for Backend Challenge",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Devel server",
      },
      {
        url: "TO-DO",
        description: "Prod server",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

export const specs = swaggerJsdoc(options);
