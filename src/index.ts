import express from "express";
import authRoutes from "./routes/authRoute";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.disable("x-powered-by");

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
