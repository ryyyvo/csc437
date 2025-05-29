import { Routes, Route, useParams } from "react-router";
import { useEffect, useState } from "react";
import { type IApiImageData } from "../../backend/src/shared/ApiImageData.ts";
import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";

function ImageDetailsWrapper() {
  const { id } = useParams();
  return <ImageDetails imageId={id || ''} />;
}

function App() {
    const [imageData, _setImageData] = useState<IApiImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    function updateImageName(imageId: string, newName: string) {
        _setImageData(prevData => 
            prevData.map(image => 
                image.id === imageId 
                    ? { ...image, name: newName }
                    : image
            )
        );
    }

    useEffect(() => {
    // Code in here will run when App is created
    // (Note in dev mode App is created twice)
        fetch("/api/images")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                _setImageData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
                setHasError(true);
                setIsLoading(false);
            });
    }, []);

    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={<MainLayout imageData={imageData} updateImageName={updateImageName} />}>
                <Route index element={<AllImages imageData={imageData} isLoading={isLoading} hasError={hasError} />} />
                <Route path={`${ValidRoutes.IMAGES}/:id`} element={<ImageDetailsWrapper />} />
                <Route path={ValidRoutes.UPLOAD} element={<UploadPage />} />
                <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;