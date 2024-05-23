import { Outlet, useRoutes } from "react-router-dom";
import Dashboard from "../../Page/users/Dashboard/Dashboard";
import PersonnalData from "../../Page/users/PersonnalData/PersonnalData";
import AccountSecurity from "../../Page/users/AccountSecurity/AccountSecurity";
import Application from "../../Page/users/Application/Application";
import Activity from "../../Page/users/Activity/Activity";
import AccountApplication from "../../Page/users/AccountApplication/AccountApplication";
import { JSXElementConstructor, ReactElement, ReactNode, useRef } from "react";
import { VITE_URIAPI } from "../../constant";
import jwtDecode from "jwt-decode";
import adminService from "../admin/adminService";
import { Button, Result } from "antd";
import { NoticeType } from "antd/es/message/interface";
import devService from "../dev/devService";
import Connection from "../../Page/users/Connection";
import { DeviceIcon } from "../../assets/icon/DeviceIcon";
import { RequestIcon } from "../../assets/icon/RequestIcon";
import { HomeIcon } from "../../assets/icon/HomeIcon";
import { DasbboardIcon } from "../../assets/icon/DasbboardIcon";
import { AccountIcon } from "../../assets/icon/AccountIcon";
import { AppIcon } from "../../assets/icon/AppIcon";
import { PersonnalDataIcon } from "../../assets/icon/personnalDataIcon";
import { SecurityIcon } from "../../assets/icon/SecurityIcon";
import { HistoriqueIcon } from "../../assets/icon/HistoriqueIcon";
import { ActivityIcon } from "../../assets/icon/ActivityIcon";
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
interface tabrefelement {
    name: string,
    value: React.MutableRefObject<HTMLElement | null>
}
interface AuthenticationResponse {
    isurl: boolean;
    istoken: boolean;
    url: string;
    token: any
}
class userService {
    constructor() {
    }
    public static getRoutes(): ReactElement<any, string | JSXElementConstructor<any>> | null {
        let users = useRoutes([
            {
                path: "", element: <Dashboard />,
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
                path: "Connection", element: <Connection />,
            },
            {
                path: "Application", element: <Outlet />,
                children: [
                    {
                        path: ":id", element: <AccountApplication />
                    },
                ]
            },
            {
                path: "*",
                element: <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, this page doesn't exist."
                    extra={<Button type="primary">Back Home</Button>}
                />,
            }
        ]);
        return users;
    }
    public static getSidebar(): IMenu[] {
        let Item: IMenu[];
        Item = [
            {
                title: "Home",
                icon: <HomeIcon />,
                submenu: [
                    { title: "Dashboard", link: "/acceuil", icon: <DasbboardIcon /> },
                ]
            },
            {
                title: "Historical",
                icon: <HistoriqueIcon />,
                submenu: [
                    { title: "Activity", link: "/acceuil/Activity", icon: <ActivityIcon /> },
                    { title: "Connection", link: "/acceuil/Connection", icon: <RequestIcon /> },
                    { title: "Device", link: "/acceuil/Device", icon: <DeviceIcon /> },
                ]
            },
            {
                title: "Account",
                icon: <AccountIcon />,
                submenu: [
                    { title: "Application", link: "/acceuil/Application", icon: <AppIcon /> },
                    { title: "personnal Data", link: "/acceuil/PersonnalData", icon: <PersonnalDataIcon /> },
                    { title: "security", link: "/acceuil/AccountSecurity", icon: <SecurityIcon /> },
                ]
            }
        ]
        return Item;
    }
    public static async checkToken(token: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const JSONdata = {
            token: token
        };
        try {
            const uri = VITE_URIAPI;
            const url = uri + '/checkToken';
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(JSONdata)
            });
            if (response.ok) {
                const data = await response.json();
                return data.response;
            } else {
                const data = await response.json();
                throw new Error(data.error);
            }
        } catch (error) {
            throw error;
        }
    }
    public static getExactSidebar(token: string): IMenu[] {
        const decode: any = jwtDecode(token);
        if (decode.Role === "Admin") {
            return adminService.getSidebar();
        }
        if (decode.Role === "Dev") {
            return devService.getSidebar();
        }
        else {
            return userService.getSidebar();
        }
    }
    public static getExactRoutes(token: string): ReactElement<any, string | JSXElementConstructor<any>> | null {
        const decode: any = jwtDecode(token);
        if (decode.Role === "Admin") {
            return adminService.getRoutes();
        }
        if (decode.Role === "Dev") {
            return devService.getRoutes();
        }
        else {
            return userService.getRoutes();
        }
    }
    public static updateName({ name, notification }: { name: string; notification: (type: NoticeType, message: string) => void; }) {
        const token: any = localStorage.getItem('token');
        const tokendecode: any = token && jwtDecode(token);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            Name: name
        };
        fetch(VITE_URIAPI + '/API/Users/updateName/' + tokendecode.UserId, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            response.json().then((responsejson: any) => {
                notification("success", responsejson.message)
            });
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error)
            });
        });
    }
    public static updateLastName({ lastname, notification }: { lastname: string; notification: (type: NoticeType, message: string) => void; }) {
        const token: any = localStorage.getItem('token');
        const tokendecode: any = token && jwtDecode(token);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            LastName: lastname
        };
        fetch(VITE_URIAPI + '/API/Users/updateLastName/' + tokendecode.UserId, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            response.json().then((responsejson: any) => {
                notification("success", responsejson.message)
            });
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error)
            });
        });
    }
    public static updateDateBirth({ datebirth, notification }: { datebirth: string; notification: (type: NoticeType, message: string) => void; }) {
        const token: any = localStorage.getItem('token');
        const tokendecode: any = token && jwtDecode(token);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            DateBirth: datebirth
        };
        fetch(VITE_URIAPI + '/API/Users/updateDateBirth/' + tokendecode.UserId, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            response.json().then((responsejson: any) => {
                notification("success", responsejson.message)
            });
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error)
            });
        });
    }
    public static updateAddress({ address, notification }: { address: string; notification: (type: NoticeType, message: string) => void; }) {
        const token: any = localStorage.getItem('token');
        const tokendecode: any = token && jwtDecode(token);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            Address: address
        };
        fetch(VITE_URIAPI + '/API/Users/updateAddress/' + tokendecode.UserId, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            response.json().then((responsejson: any) => {
                notification("success", responsejson.message)
            });
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error)
            });
        });
    }
    public static updatePhoneNumber({ phoneNumber, notification }: { phoneNumber: string; notification: (type: NoticeType, message: string) => void; }) {
        const token: any = localStorage.getItem('token');
        const tokendecode: any = token && jwtDecode(token);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            PhoneNumber: phoneNumber
        };
        fetch(VITE_URIAPI + '/API/Users/updatePhoneNumber/' + tokendecode.UserId, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            response.json().then((responsejson: any) => {
                notification("success", responsejson.message)
            });
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error)
            });
        });
    }

    public static async getActivitysUser() {
        console.log("mety");
        try {
            const token: any = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            const tokendecode: any = jwtDecode(token);

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('x-auth-token', token);

            const response = await fetch(VITE_URIAPI + '/API/Activity/' + tokendecode.UserApplication, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                const errorJson = await response.json();
                throw new Error(errorJson.error);
            }

            const responseJson = await response.json();
            return responseJson.lActivity;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    public static getref() {
        const Nameref = useRef<HTMLElement | null>(null)
        const LastNameRef = useRef<HTMLElement | null>(null)
        const Addressref = useRef<HTMLElement | null>(null)
        const DateBirthref = useRef<HTMLElement | null>(null)
        const PhoneNumberref = useRef<HTMLElement | null>(null)
        const Passwordref = useRef<HTMLElement | null>(null)
        const tab: tabrefelement[] = [
            { name: "Name", value: Nameref },
            { name: "LastName", value: LastNameRef },
            { name: "Address", value: Addressref },
            { name: "DateBirth", value: DateBirthref },
            { name: "PhoneNumber", value: PhoneNumberref },
            { name: "Password", value: Passwordref },
        ]
        return tab;
    }
    public static getrefvalue(key: string, tab: tabrefelement[]) {
        for (let index = 0; index < tab.length; index++) {
            if (tab[index].name === key) {
                return tab[index].value;
            }
        }
    }
    public static async getclient() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Users/client/', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }

    }
    public static async getAdmin() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Users/admin/', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
    public static async getDev() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        try {
            const response = await fetch(VITE_URIAPI + '/API/Users/dev/', {
                method: 'GET',
                headers: headers,
            });
            if (response.ok) {
                const data = response.json();
                return data;
            } else {
                throw new Error('Failed to fetch Application');
            }
        } catch (error) {
            throw error;
        }
    }
}
export default userService;