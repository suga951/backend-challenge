import express from "express";
import dotenv from "dotenv";
import { projectRouter } from "./routes/projectRouter.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

app.use("/api", projectRouter());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
