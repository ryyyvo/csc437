import { Request, Response, NextFunction } from "express";
import multer from "multer";

class ImageFormatError extends Error {}

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = process.env.IMAGE_UPLOAD_DIR || "uploads";
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Determine file extension based on mimetype
        let extension: string;

        if (file.mimetype === "image/png") {
            extension = ".png";
        } else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            extension = ".jpg";
        } else {
            cb(new ImageFormatError("Unsupported image type"), "");
            return;
        }

        // Generate unique filename with the extension
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1E9) + extension;
        cb(null, fileName);
    }
});

export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});

export function handleImageFileErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}