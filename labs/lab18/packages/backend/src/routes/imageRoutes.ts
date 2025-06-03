import express, { Request, Response } from "express";
import { ImageProvider } from "../ImageProvider";
import { ObjectId } from "mongodb";

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
        const MAX_NAME_LENGTH = 100;

        // check if request is properly formatted
        if (!newName) {
            return res.status(400).send({
                error: "Bad Request",
                message: "Name is required in the request body"
            });
        }

        // check if image name is too long
        if (newName.length > MAX_NAME_LENGTH) {
            return res.status(422).send({
                error: "Unprocessable Entity",
                message: `Image name exceeds ${MAX_NAME_LENGTH} characters`
            });
        }

        // check if id is a valid ObjectId
        if (!ObjectId.isValid(imageId)) {
            return res.status(404).send({
                error: "Not Found",
                message: "Image does not exist"
            });
        }
        
        try {
            const imageAuthor = await imageProvider.getImageAuthor(imageId);
            
            if (!imageAuthor) {
                return res.status(404).send({
                    error: "Not Found",
                    message: "Image does not exist"
                });
            }
            
            if (!req.user || req.user.username !== imageAuthor) {
                return res.status(403).send({
                    error: "Forbidden",
                    message: "You can only edit your own images"
                });
            }
            
            console.log(`Updating image ${imageId} with new name: ${newName}`);
            
            const matchedCount = await imageProvider.updateImageName(imageId, newName);

            if (matchedCount === 0) {
                return res.status(404).send({
                    error: "Not Found",
                    message: "Image does not exist"
                });
            }
            
            res.status(204).send();
        } catch (error) {
            console.error("Error updating image name:", error);
            res.status(500).json({ error: "Failed to update image name" });
        }
    });
}

