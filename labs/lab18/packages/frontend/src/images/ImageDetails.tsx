import { useState } from "react";
import { fetchDataFromServer } from "../MockAppData.ts";

interface IImageDetailsProps {
    imageId: string;
}

export function ImageDetails({ imageId }: IImageDetailsProps) {
    const [imageData, _setImageData] = useState(fetchDataFromServer);
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