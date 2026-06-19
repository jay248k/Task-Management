import express from "express";
import { connectDB } from "./config/db";
import cors from 'cors';
import taskRoutes from "./routes/task.route";
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});