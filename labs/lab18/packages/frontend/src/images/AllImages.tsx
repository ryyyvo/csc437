import type { IApiImageData } from "../../../backend/src/shared/ApiImageData.ts";
import { ImageGrid } from "./ImageGrid.tsx";

interface AllImagesProps {
    imageData: IApiImageData[];
    isLoading: boolean;
    hasError: boolean;
    searchPanel: React.ReactNode;
}

export function AllImages({ imageData, isLoading, hasError, searchPanel }: AllImagesProps) {
    if (isLoading) {
        return (
            <>
                <h2>All Images</h2>
                {searchPanel}
                <p>Loading images...</p>
            </>
        );
    }

    if (hasError) {
        return (
            <>
                <h2>All Images</h2>
                {searchPanel}
                <p>Error loading images. Please try again later.</p>
            </>
        );
    }

    return (
        <>
            <h2>All Images</h2>
            {searchPanel}
            <ImageGrid images={imageData} />
        </>
    );
}