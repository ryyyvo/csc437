import type { IImageData } from "../MockAppData.ts";
import { ImageGrid } from "./ImageGrid.tsx";

interface AllImagesProps {
    imageData: IImageData[];
}

export function AllImages({ imageData }: AllImagesProps) {
    // Removed useState as we're now receiving data via props
    return (
        <>
            <h2>All Images</h2>
            <ImageGrid images={imageData} />
        </>
    );
}