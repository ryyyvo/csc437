import type { IApiImageData } from "../../../backend/src/shared/ApiImageData.ts";
import { useOutletContext } from "react-router";
import { ImageNameEditor } from "./ImageNameEditor.tsx";

interface IImageDetailsProps {
    imageId: string;
}

interface IOutletContext {
    imageData: IApiImageData[];
    updateImageName: (imageId: string, newName: string) => void;
    authToken?: string;
}

export function ImageDetails({ imageId }: IImageDetailsProps) {
    const { imageData, updateImageName, authToken } = useOutletContext<IOutletContext>();
    const image = imageData.find(image => image.id === imageId);
    
    if (!image) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{image.name}</h2>
            <p>By {image.author.username}</p>
            <ImageNameEditor 
                initialValue={image.name} 
                imageId={image.id} 
                onNameUpdate={updateImageName}
                authToken={authToken}
            />
            <img className="ImageDetails-img" src={image.src} alt={image.name} />
        </>
    );
}