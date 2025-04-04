import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import mongoose, { ConnectOptions } from "mongoose";
import { initializeDatabase, sequelize } from './conf/dbConfig';
import swaggerOptions from './conf/swaggerConfig';
import { getHtmlPage } from './conf/htmlPageConfig';
import { initializeTypes } from "./conf/init";
import registerConfigRoutes from "./routes/config.routes.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.CONFIG_SERVICE_PORT || 3007;

// Configuration CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send(getHtmlPage());
});

//Définition des routes
registerConfigRoutes(app);
app.use((req, res, next) => {
    console.log("📢 Requête reçue :", req.method, req.originalUrl);
    next();
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const startServer = async () => {
    try {
        await initializeDatabase();
        await sequelize.sync({ force: false });
        console.log("✅ Tables synchronisées");

        await initializeTypes();

        // Connexion à MongoDB
        // const mongoOptions: ConnectOptions = {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // } as ConnectOptions;
        // await mongoose.connect(process.env.MONGO_CONFIG_URI, mongoOptions);
        // console.log("✅ Connecté à MongoDB", process.env.MONGO_CONFIG_URI);

        app.listen(port, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Impossible de se connecter à la base de données:", error);
    }
};

startServer().then(r => {});