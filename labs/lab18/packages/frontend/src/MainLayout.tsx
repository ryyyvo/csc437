import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import type { IApiImageData } from "../../backend/src/shared/ApiImageData.ts";

interface IMainLayoutProps {
    imageData: IApiImageData[];
    updateImageName: (imageId: string, newName: string) => void;
    authToken?: string;
    onLogout?: () => void;
}
export function MainLayout({ imageData, updateImageName, authToken, onLogout }: IMainLayoutProps) {
    return (
        <div>
            <Header authToken={authToken} onLogout={onLogout} />
            <div className="MainLayout" style={{padding: "0 2em"}}>
                <Outlet context={{ imageData, updateImageName, authToken }} />
            </div>
        </div>
    );
}