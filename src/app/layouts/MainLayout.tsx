import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";
import type React from "react";

const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="container-fluid p-0">
                <Outlet />
            </main>
        </>
    );
};
export default MainLayout;