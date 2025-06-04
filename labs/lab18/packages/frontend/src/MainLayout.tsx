import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import type { IApiImageData } from "../../backend/src/shared/ApiImageData.ts";

interface IMainLayoutProps {
    imageData: IApiImageData[];
    updateImageName: (imageId: string, newName: string) => void;
    authToken?: string;
}
export function MainLayout({ imageData, updateImageName, authToken }: IMainLayoutProps) {
    return (
        <div>
            <Header />
            <div className="MainLayout" style={{padding: "0 2em"}}>
                <Outlet context={{ imageData, updateImageName, authToken }} />
            </div>
        </div>
    );
}