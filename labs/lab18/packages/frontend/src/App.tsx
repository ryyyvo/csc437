import { Routes, Route, useParams } from "react-router";
import { AllImages } from "./images/AllImages.tsx";
import { ImageDetails } from "./images/ImageDetails.tsx";
import { UploadPage } from "./UploadPage.tsx";
import { LoginPage } from "./LoginPage.tsx";

function ImageDetailsWrapper() {
  const { id } = useParams();
  return <ImageDetails imageId={id || ''} />;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<AllImages />} />
            <Route path="/images/:id" element={<ImageDetailsWrapper />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
