import type { IApiImageData } from "../../../backend/src/shared/ApiImageData.ts";
import { useOutletContext } from "react-router";

interface IImageDetailsProps {
    imageId: string;
}

export function ImageDetails({ imageId }: IImageDetailsProps) {
    const imageData = useOutletContext<IApiImageData[]>();
    const image = imageData.find(image => image.id === imageId);
    
    if (!image) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{image.name}</h2>
            <p>By {image.author.username}</p>
            <img className="ImageDetails-img" src={image.src} alt={image.name} />
        </>
    );
}