import { Routes, Route, useParams } from "react-router";
import { useState } from "react";
import { fetchDataFromServer } from "./MockAppData.ts";
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
    const [imageData, _setImageData] = useState(fetchDataFromServer);
    
    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={<MainLayout imageData={imageData} />}>
                <Route index element={<AllImages imageData={imageData} />} />
                <Route path={`${ValidRoutes.IMAGES}/:id`} element={<ImageDetailsWrapper />} />
                <Route path={ValidRoutes.UPLOAD} element={<UploadPage />} />
                <Route path={ValidRoutes.LOGIN} element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
