import RequireAuth from "@/components/requireAuth/RequireAuth";
import LoginPage from "@/pages/auth/LoginPage";
import EmployeCreate from "@/pages/employe/EmployeCreate";
import EmployeLayout from "@/pages/employe/EmployeLayout";
import Employelist from "@/pages/employe/Employelist";
import FormationCreate from "@/pages/formation/FormationCreate";
import FormationLayout from "@/pages/formation/FormationLayout";
import FormationList from "@/pages/formation/FormationList";
import FourmateurCreate from "@/pages/fourmateur/FourmateurCreate";
import FourmateurLayout from "@/pages/fourmateur/FourmateurLayout";
import FourmateurList from "@/pages/fourmateur/FourmateurList";
import DashboardLayout from "@/pages/Layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/dashboard',
        // wrap the protected routers with the componant requireauth
        element: <RequireAuth>
                    <DashboardLayout />
                </RequireAuth>
        ,
        children: [
            {
                path: '',
                element: <h1>table bord</h1>
            },
            {
                path: 'fourmateur',
                element: <FourmateurLayout />,
                children: [
                    {
                        path : '',
                        element : <FourmateurList/>
                    },
                    {
                        path : 'create',
                        element : <FourmateurCreate/>
                    }
                ]
            },
            {
                path : 'employes',
                element : <EmployeLayout/>,
                children : [
                    {
                        path : '' ,
                        element : <Employelist/>
                    },
                    {
                        path : 'create' ,
                        element : <EmployeCreate/>
                    },
                ]
            },
            {
                path: 'formations',
                element : <FormationLayout/>,
                children : [
                    {
                        path : '',
                        element : <FormationList/>
                    },
                    {
                        path : 'create' ,
                        element : <FormationCreate/>
                    }
                ]
            }
        ]
    }
]);

