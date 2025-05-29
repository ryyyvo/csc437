import type { IApiImageData } from "../../../backend/src/shared/ApiImageData.ts";
import { ImageGrid } from "./ImageGrid.tsx";

interface AllImagesProps {
    imageData: IApiImageData[];
    isLoading: boolean;
    hasError: boolean;
}

export function AllImages({ imageData, isLoading, hasError }: AllImagesProps) {
    if (isLoading) {
        return (
            <>
                <h2>All Images</h2>
                <p>Loading images...</p>
            </>
        );
    }

    if (hasError) {
        return (
            <>
                <h2>All Images</h2>
                <p>Error loading images. Please try again later.</p>
            </>
        );
    }

    return (
        <>
            <h2>All Images</h2>
            <ImageGrid images={imageData} />
        </>
    );
}