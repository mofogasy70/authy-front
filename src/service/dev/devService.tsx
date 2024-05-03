import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Link, Outlet, useRoutes } from "react-router-dom";
import { CarryOutOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DashboardOutlined, DatabaseOutlined, SecurityScanOutlined, UserOutlined, WarningTwoTone } from "@ant-design/icons";
import Dashboard from "../../Page/dev/Dashboard/Dashboard";
import { Result, Button, Tag } from "antd";
import AccountSecurity from "../../Page/dev/AccountSecurity/AccountSecurity";
import Activity from "../../Page/dev/Activity/Activity";
import PersonnalData from "../../Page/dev/PersonnalData/PersonnalData";
import Application from "../../Page/dev/Application/Application";
import ApplicationDetail from "../../Page/dev/Application/ApplicationDetail";
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
class devService {
    constructor() {
    }
    public static getRoutes(): ReactElement<any, string | JSXElementConstructor<any>> | null {
        let dev = useRoutes([
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "PersonnalData", element: <PersonnalData />,
            },
            {
                path: "AccountSecurity", element: <AccountSecurity />,
            },
            {
                path: "Activity", element: <Activity />,
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
                path: "*",
                element: <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, this page doesn't exist."
                    extra={<Link to=""><Button >Back Home</Button></Link>}
                />,
            }
        ]);
        return dev;
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
                ]
            },
            {
                title: "Account",
                icon: <UserOutlined />,
                submenu: [
                    { title: "Activity", link: "/acceuil/Activity", icon: <CarryOutOutlined /> },
                    { title: "personnal Data", link: "/acceuil/PersonnalData", icon: <UserOutlined /> },
                    { title: "security", link: "/acceuil/AccountSecurity", icon: <SecurityScanOutlined /> },
                ]
            }
        ];
        return Item;
    }
    public static toTag(nbr: number | undefined) {
            if (nbr===2) {
                return <Tag title="Approved" className="w-full text-xs h-full flex items-center justify-center font-blinkmacsystem" color="green-inverse">Approved</Tag>;
            }
            if (nbr===1) {
                return <Tag title="Hold on" className="w-full text-xs h-full flex items-center justify-center font-blinkmacsystem" color="orange-inverse">Hold on</Tag>;
            }
            if (nbr===3) {
                return <Tag title="Not Approved" className="w-full text-xs h-full flex items-center justify-center font-blinkmacsystem" color="red-inverse">Not Approved</Tag>;
            }   
    }
    public static toChek(nbr: number | undefined) {
        if (nbr===2) {
            return <div><CheckCircleTwoTone twoToneColor="#52c41a"/> Approved</div>;
        }
        if (nbr===1) {
            return <div><WarningTwoTone twoToneColor="#FF7F27"/> Hold on</div>;
        }
        if (nbr===3) {
            return <div><CloseCircleTwoTone twoToneColor="#eb2f96" /> disapproved</div>;
        }   
}
}
export default devService;