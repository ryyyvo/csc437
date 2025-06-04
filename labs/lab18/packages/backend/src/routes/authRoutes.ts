import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CredentialsProvider } from "../CredentialsProvider";

interface IAuthTokenPayload {
    username: string;
}

function generateAuthToken(username: string, jwtSecret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const payload: IAuthTokenPayload = {
            username
        };
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, credentialsProvider: CredentialsProvider) {
    app.post("/auth/register", async (req: Request, res: Response): Promise<any> => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }
        
        try {
            const success = await credentialsProvider.registerUser(username, password);
            
            if (!success) {
                return res.status(409).send({
                    error: "Conflict",
                    message: "Username already taken"
                });
            }
            
            const token = await generateAuthToken(username, req.app.locals.JWT_SECRET);
            res.status(201).send({ token });
            
        } catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).send({
                error: "Internal server error",
                message: "Failed to register user"
            });
        }
    });

    app.post("/auth/login", async (req: Request, res: Response): Promise<any> => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }
        
        try {
            const isValid = await credentialsProvider.verifyPassword(username, password);
            
            if (isValid) {
                const token = await generateAuthToken(username, req.app.locals.JWT_SECRET);
                
                res.status(200).send({ token });
            } else {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect username or password"
                });
            }
            
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send({
                error: "Internal server error",
                message: "Failed to process login"
            });
        }
    });
}