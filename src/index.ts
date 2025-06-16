import express from "express";
import accessTokenRoute from "./routes/accessTokenRoute";
import authRoutes from "./routes/authRoute";
import swaggerSpec from "./swagger/swagger";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "https://frontend-service-782869810736.europe-west1.run.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
); // NOSONAR
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
