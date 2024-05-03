import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Roles from "../../Page/Admin/Roles/Roles";
import Users from "../../Page/Admin/Users/Users";
import Security from "../../Page/Admin/Security/Security";
import Application from "../../Page/Admin/Application/Application";
import TypeSecurity from "../../Page/Admin/Security/TypeSecurity";
import { DashboardOutlined, DatabaseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import Dashboard from "../../Page/Admin/Dashboard/Dashboard";
import ApplicationDetail from "../../Page/Admin/Application/ApplicationDetail";
interface IsubMenu {
    title: string,
    link: string,
    icon?: ReactNode
}
interface IMenu {
    title: string,
    icon?: ReactNode
    submenu: IsubMenu[]
}
class adminService {
    constructor() {
    }
    public static getRoutes(): ReactElement<any, string | JSXElementConstructor<any>> | null {
        let admin = useRoutes([
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "Roles",
                element: <Roles />,
            },
            {
                path: "Users",
                element: <Users />,
            },
            {
                path: "Application", element: <Application />,
            },
            {
                path: "Application", element: <Outlet />,
                children: [
                    {
                        path: ":id", element: <ApplicationDetail />
                    },
                ]
            },
            {
                path: "Security",
                element: <Security />,
            },
            {
                path: "TypeSecurity",
                element: <TypeSecurity />,
            },
            {
                path: "*",
                element: <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />,
            }
        ]);
        return admin;
    }
    public static getSidebar(): IMenu[] {
        let Item: IMenu[];
        Item = [
            {
                title: "Home",
                icon: <DashboardOutlined />,
                submenu: [
                    { title: "Dashboard", link: "/acceuil", icon: "" },
                ]
            },
            {
                title: "Data",
                icon: <DatabaseOutlined />,
                submenu: [
                    { title: "Application", link: "/acceuil/Application", icon: "" },
                    { title: "Users", link: "/acceuil/Users", icon: "" },
                    { title: "Security", link: "/acceuil/Security", icon: "" },
                ]
            },
            {
                title: "Crud",
                icon:<EditOutlined />,
                submenu: [
                    { title: "Roles", link: "/acceuil/Roles", icon: "" },
                    { title: "Typesecurity", link: "/acceuil/Typesecurity", icon: "" },
                ]
            }
        ];
        return Item;
    }
}
export default adminService;