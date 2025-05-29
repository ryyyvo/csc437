import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import type { IApiImageData } from "../../backend/src/shared/ApiImageData.ts";

interface MainLayoutProps {
    imageData: IApiImageData[];
}

export function MainLayout({ imageData }: MainLayoutProps) {
    return (
        <div>
            <Header />
            <div style={{padding: "0 2em"}}>
                <Outlet context={imageData} />
            </div>
        </div>
    );
}