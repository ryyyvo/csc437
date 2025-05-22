import { Routes, Route, useParams } from "react-router";
import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { MainLayout } from "./MainLayout.tsx";

function ImageDetailsWrapper() {
  const { id } = useParams();
  return <ImageDetails imageId={id || ''} />;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<AllImages />} />
                <Route path="images/:id" element={<ImageDetailsWrapper />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
