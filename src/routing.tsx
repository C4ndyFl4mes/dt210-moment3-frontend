import { createBrowserRouter } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import ThreadsPage from "./pages/ThreadsPage";
import SingleThreadPage from "./pages/SingleThreadPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import AdminHandlingPostsPage from "./pages/AdminHandlingPostsPage";
import AdminHandlingThreadsPage from "./pages/AdminHandlingThreadsPage";
import Layout from "./components/layout/Layout";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ThreadsPage />
            },
            {
                path: "/thread/:id/:currentPage",
                element: <SingleThreadPage />
            },
            {
                path: "/account",
                element: <AccountPage />
            },
            {
                path: "/admin",
                element: <AdminPanelPage />
            },
            {
                path: "/admin/handling-posts",
                element: <AdminHandlingPostsPage />
            },
            {
                path: "/admin/handling-threads",
                element: <AdminHandlingThreadsPage />
            }
        ]
    }
]);