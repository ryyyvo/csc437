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

    constructor(private readonly mongoClient: MongoClient) {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        
        this.imageCollection = this.mongoClient.db().collection(imageCollectionName);
    }

    async getAllImages(searchQuery?: string): Promise<IApiImageData[]> {
        const filter = searchQuery 
            ? { name: { $regex: searchQuery, $options: 'i' } }
            : {};
            
        const images = await this.imageCollection.find(filter).toArray();
        
        return images.map(image => {
            return {
                id: image._id.toString(),
                name: image.name,
                src: image.src,
                author: {
                    id: image.authorId,
                    username: image.authorId
                }
            };
        });
    }

    async getImageAuthor(imageId: string): Promise<string | null> {
        const objectId = new ObjectId(imageId);
        const image = await this.imageCollection.findOne({ _id: objectId });
        return image ? image.authorId : null;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const objectId = new ObjectId(imageId);

        const result = await this.imageCollection.updateOne(
            { _id: objectId },
            { $set: { name: newName } }
        );

        return result.matchedCount;
    }

    async createImage(imageData: { authorId: string; name: string; src: string }) {
        const result = await this.imageCollection.insertOne({
            _id: new ObjectId(),
            authorId: imageData.authorId,
            name: imageData.name,
            src: imageData.src
        });
        
        return result;
    }
}