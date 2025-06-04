import { Routes, Route, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { type IApiImageData } from "../../backend/src/shared/ApiImageData.ts";
import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
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
    const [authToken, setAuthToken] = useState<string | null>(null);
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

            const headers: HeadersInit = {};
            if (authToken) {
                headers["Authorization"] = `Bearer ${authToken}`;
            }
                
            const response = await fetch(url, {
                headers
            });
            
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

    function handleAuthSuccess(token: string) {
        setAuthToken(token);
        fetchImages();
    }

    function handleLogout() {
        setAuthToken(null);
    }

    useEffect(() => {
        if (authToken) {
            fetchImages();
        }
    }, [authToken]);

    const searchPanel = (
        <ImageSearchForm
            searchString={searchString}
            onSearchStringChange={setSearchString}
            onSearchRequested={handleImageSearch}
        />
    );

    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={
                <ProtectedRoute authToken={authToken || ""}>
                    <MainLayout 
                        imageData={imageData} 
                        updateImageName={updateImageName} 
                        authToken={authToken || undefined} 
                        onLogout={handleLogout}
                    />
                </ProtectedRoute>
            }>
                <Route index element={<AllImages imageData={imageData} isLoading={isLoading} hasError={hasError} searchPanel={searchPanel} />} />
                <Route path={`${ValidRoutes.IMAGES}/:id`} element={<ImageDetailsWrapper />} />
                <Route path={ValidRoutes.UPLOAD} element={<UploadPage />} />
            </Route>
            <Route path={ValidRoutes.LOGIN} element={<LoginPage onAuthSuccess={handleAuthSuccess} />} />
            <Route path={ValidRoutes.REGISTER} element={<LoginPage isRegistering={true} onAuthSuccess={handleAuthSuccess} />} />
        </Routes>
    );
}

export default App;