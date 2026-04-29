import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import morgan from 'morgan';

// route imports 
import authRoutes from "./routes/authRoute.js";
import celestialBodyRoutes from "./routes/celestialRoute.js";
import resourceRoutes from "./routes/resourceRoute.js";
import favoriteRoutes from "./routes/favoriteRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

let specs
try {
  specs = yaml.load(fs.readFileSync('./docs/spaceapi.yaml', 'utf8'));
} catch (error) {
  console.log('Failed to load OpenAPI specification', error.message);
  process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/celestial-bodies", celestialBodyRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
})

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    if (!err.status) {
        err.status = 500;
        err.message = "Internal Server Error";
    }

    res.status(err.status).json({
        error: err.message,
    });
});

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;

