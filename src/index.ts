import express from "express";
import accessTokenRoute from "./routes/accessTokenRoute";
import authRoutes from "./routes/authRoute";
import swaggerSpec from "./swagger/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/access", accessTokenRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.disable("x-powered-by");

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT);
}

export default app;
