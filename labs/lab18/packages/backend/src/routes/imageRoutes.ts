import express, { Request, Response } from "express";
import { ImageProvider } from "../ImageProvider";

function waitDuration(numMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, numMs));
}

export function registerImageRoutes(app: express.Application, imageProvider: ImageProvider) {
    app.get("/api/images", async (req: Request, res: Response) => {
        await waitDuration(1000);
        try {
            const images = await imageProvider.getAllImages();
            res.json(images);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });

    app.get("/api/images/search", async (req: Request, res: Response) => {
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

    app.put("/api/images/:id", async (req: Request, res: Response): Promise<any> => {
        const imageId = req.params.id;
        const newName = req.body.name;

        if (!newName) {
            return res.status(400).json({ error: "Name is required" });
        }
        
        console.log(`Updating image ${imageId} with new name: ${newName}`);
        
        try {
            const matchedCount = await imageProvider.updateImageName(imageId, newName);
            
            if (matchedCount === 0) {
                return res.status(404).json({ error: "Image not found" });
            }
            
            res.status(204).send();
        } catch (error) {
            console.error("Error updating image name:", error);
            res.status(500).json({ error: "Failed to update image name" });
        }
    });
}

