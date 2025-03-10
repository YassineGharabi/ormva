import LoginPage from "@/pages/auth/LoginPage";
import FourmateurList from "@/pages/fourmateur/FourmateurList";
import DashboardLayout from "@/pages/Layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <LoginPage/>
    },
    {
        path : '/dashboard',
        element : <DashboardLayout/>,
        children : [
            {
                path : '' ,
                element : <h1>table bord</h1>
            },
            {
                path : 'fourmateur' ,
                element : <FourmateurList/>
            },
        ]
    }
]);

