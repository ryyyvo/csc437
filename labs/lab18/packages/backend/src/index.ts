import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes";
import { connectMongo } from "./connectMongo";
import { ImageProvider } from "./ImageProvider";
import { CredentialsProvider } from "./CredentialsProvider";
import { registerImageRoutes } from "./routes/imageRoutes";
import { registerAuthRoutes } from "./routes/authRoutes";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const mongoClient = connectMongo();
let imageProvider = new ImageProvider(mongoClient);
let credentialsProvider = new CredentialsProvider(mongoClient);

async function initializeMongo() {
    try {
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB");
        
        const collections = await mongoClient.db().listCollections().toArray();
        console.log("Available collections:", collections.map(col => col.name));
        
        imageProvider = new ImageProvider(mongoClient);
        credentialsProvider = new CredentialsProvider(mongoClient);
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

const app = express();

initializeMongo();

app.use(express.static(STATIC_DIR));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

registerImageRoutes(app, imageProvider);
registerAuthRoutes(app, credentialsProvider);

app.get([
  ...Object.values(ValidRoutes),
  `${ValidRoutes.IMAGES}/*`
], (req: Request, res: Response) => {
  res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});