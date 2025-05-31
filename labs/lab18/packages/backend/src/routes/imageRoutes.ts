import express from "express";
import { ImageProvider } from "../ImageProvider";

function waitDuration(numMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, numMs));
}

export function registerImageRoutes(app: express.Application, imageProvider: ImageProvider) {
    app.get("/api/images", async (req: express.Request, res: express.Response) => {
        await waitDuration(1000);
        try {
            const images = await imageProvider.getAllImages();
            res.json(images);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.get("/api/images/search", async (req: express.Request, res: express.Response) => {
        const searchQuery = req.query.q as string;
        console.log("Search query received:", searchQuery);
        
        try {
            const images = await imageProvider.getAllImages(searchQuery);
            res.json(images);
        } catch (error) {
            console.error("Error searching images:", error);
            res.status(500).json({ error: "Failed to search images" });
        }
    });
}

