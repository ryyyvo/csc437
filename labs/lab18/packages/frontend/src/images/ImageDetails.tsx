import type { IImageData } from "../MockAppData.ts";
import { useOutletContext } from "react-router";

interface IImageDetailsProps {
    imageId: string;
}

export function ImageDetails({ imageId }: IImageDetailsProps) {
    const imageData = useOutletContext<IImageData[]>();
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