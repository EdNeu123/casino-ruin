import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col casino-bg">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

