import { MongoClient, Collection, ObjectId } from "mongodb";
import { IApiImageData, IApiUserData } from "./shared/ApiImageData";

interface IImageDocument {
    _id: ObjectId;
    authorId: string;
    name: string;
    src: string;
}

interface IUserDocument {
    _id: string;
    email: string;
    username: string;
}

export class ImageProvider {
    private imageCollection: Collection<IImageDocument>;
    private userCollection: Collection<IUserDocument>;

    constructor(private readonly mongoClient: MongoClient) {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const userCollectionName = process.env.USERS_COLLECTION_NAME;
        
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        
        if (!userCollectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }
        
        this.imageCollection = this.mongoClient.db().collection(imageCollectionName);
        this.userCollection = this.mongoClient.db().collection(userCollectionName);
    }

    async getAllImages(): Promise<IApiImageData[]> {
        // get images from the database
        const images = await this.imageCollection.find().toArray();
        
        // get unique authorId's from the images
        const authorIds = [...new Set(images.map(image => image.authorId))];
        
        // fetch all users that match author IDs
        const users = await this.userCollection.find({ _id: { $in: authorIds } }).toArray();
        
        // create map for user lookup by ID
        const userMap = new Map<string, IApiUserData>();
        users.forEach(user => {
            userMap.set(user._id, {
                id: user._id,
                username: user.username
            });
        });
        
        // transform image documents to match IApiImageData
        return images.map(image => {
            const author = userMap.get(image.authorId) || {
                id: image.authorId,
                username: "Unknown User"
            };
        
            return {
                id: image._id.toString(),
                name: image.name,
                src: image.src,
                author: author
            };
        });
    }
}