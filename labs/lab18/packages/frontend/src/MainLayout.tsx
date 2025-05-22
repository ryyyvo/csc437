import { Outlet } from "react-router";
import { Header } from "./Header.tsx";
import type { IImageData } from "./MockAppData.ts";

interface MainLayoutProps {
    imageData: IImageData[];
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
