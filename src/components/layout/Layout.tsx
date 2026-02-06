import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import UserStore from "../../stores/UserStore";

export default function Layout() {
    useEffect(() => {
        UserStore.getCurrentUser();
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}