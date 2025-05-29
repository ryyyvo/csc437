import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ValidRoutes } from "./shared/ValidRoutes";
import { fetchDataFromServer } from "./shared/ApiImageData";
import { connectMongo } from "./connectMongo";

dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";

const mongoClient = connectMongo();

async function initializeMongo() {
    try {
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB");
        
        const collections = await mongoClient.db().listCollections().toArray();
        console.log("Available collections:", collections.map(col => col.name));
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

initializeMongo();

const app = express();

function waitDuration(numMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, numMs));
}

app.use(express.static(STATIC_DIR));

app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/api/images", async (req: Request, res: Response) => {
    await waitDuration(1000);
    const images = fetchDataFromServer();
    res.json(images);
});

app.get(Object.values(ValidRoutes) as string[], (req: Request, res: Response) => {
    res.sendFile("index.html", { root: STATIC_DIR });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});