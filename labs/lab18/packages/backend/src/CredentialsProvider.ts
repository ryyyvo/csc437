import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        const existingUser = await this.collection.findOne({ username: username });
        if (existingUser) {
            return false;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
        
        // for debugging - remove later
        console.log("Salt:", salt);
        console.log("Hash:", hashedPassword);

        await this.collection.insertOne({
            username: username,
            password: hashedPassword
        });

        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        // Get the user record from database
        const user = await this.collection.findOne({ username: username });
        
        if (!user) {
            return false; // User doesn't exist
        }
        
        // Compare the plaintext password with the hashed password using bcrypt
        const isValid = await bcrypt.compare(plaintextPassword, user.password);
        return isValid;
    }
}
