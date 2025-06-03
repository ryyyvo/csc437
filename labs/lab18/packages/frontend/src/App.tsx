import { Routes, Route, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { type IApiImageData } from "../../backend/src/shared/ApiImageData.ts";
import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";
import { ImageSearchForm } from "./images/ImageSearchForm.tsx";

function ImageDetailsWrapper() {
  const { id } = useParams();
  return <ImageDetails imageId={id || ''} />;
}

function App() {
    const [imageData, _setImageData] = useState<IApiImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [searchString, setSearchString] = useState("");
    const requestNumberRef = useRef(0);

    function updateImageName(imageId: string, newName: string) {
        _setImageData(prevData => 
            prevData.map(image => 
                image.id === imageId 
                    ? { ...image, name: newName }
                    : image
            )
        );
    }

    async function fetchImages(searchQuery?: string) {
        requestNumberRef.current++;
        const thisRequestNumber = requestNumberRef.current;

        if (thisRequestNumber === requestNumberRef.current) {
            setIsLoading(true);
            setHasError(false);
        }
        
        try {
            const url = searchQuery && searchQuery.trim() !== "" 
                ? `/api/images/search?q=${encodeURIComponent(searchQuery)}`
                : "/api/images";
                
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const data = await response.json();
            
            if (thisRequestNumber === requestNumberRef.current) {
                _setImageData(data);
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            
            if (thisRequestNumber === requestNumberRef.current) {
                setHasError(true);
            }
        } finally {
            if (thisRequestNumber === requestNumberRef.current) {
                setIsLoading(false);
            }
        }
    }

    function handleImageSearch() {
        fetchImages(searchString);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    const searchPanel = (
        <ImageSearchForm
            searchString={searchString}
            onSearchStringChange={setSearchString}
            onSearchRequested={handleImageSearch}
        />
    );

    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={<MainLayout imageData={imageData} updateImageName={updateImageName} />}>
                <Route index element={<AllImages imageData={imageData} isLoading={isLoading} hasError={hasError} searchPanel={searchPanel} />} />
                <Route path={`${ValidRoutes.IMAGES}/:id`} element={<ImageDetailsWrapper />} />
                <Route path={ValidRoutes.UPLOAD} element={<UploadPage />} />
                <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;