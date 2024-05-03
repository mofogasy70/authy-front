import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useState, useEffect } from "react";
import { VITE_URIAPI } from "../../../constant";

const Uselogic = () => {
    interface ITypeSecurity {
        _id: string;
        Name: string;
        Description: string;
    }
    interface ITypeSecuritysWithChild {
        TypeSecurity?: ITypeSecurity;
        UserAppSecurity?: IUserAppSecurity[];
    }
    interface IUserAppSecurity {
        _id: string
        MaxAttemps: number;
        MaxRetries: number;
        ValidityTime: number;
        Status: boolean;
        UserApplication: string;
        Security: any;
    }
    interface Iplacement {
        card1: number;
        card2: number;
        espacement: number;
    }
    const uri = VITE_URIAPI;
    const [messageApi, contextHolder] = message.useMessage();
    const [LITypeSecuritysWithChild, setITypeSecuritysWithChild] = useState<ITypeSecuritysWithChild[]>()
    const [info, setInfo] = useState<any>();
    useEffect(() => {
        const token: any = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        async function fechuser() {
            try {
                const JSONdata = {
                    Application: "6519767f6e29ff41fcdd4d35",
                };
                const url = uri + '/API/TypeSecurity/TypeSecuritysWithChild';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(JSONdata)
                });
                if (response.ok) {
                    const data = await response.json();
                    setITypeSecuritysWithChild(data);
                    console.log(data);

                } else {
                    throw new Error('Failed to fetch roles');
                }
            } catch (error) {
                alert(error);
            }
        };
        fechuser();
    }, []);
    function notification(type: NoticeType, message: string) {
        messageApi.open({
            type: type,
            content: message,
        });
    }
    async function chageStatus(UserAppSecurity: string, status: boolean) {
        const token: any = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            userAppSecurity: UserAppSecurity,
            status: status
        };
        const response = await fetch('http://localhost:5000/API/UserAppSecurity/chageStatus', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            notification('success', data.message);
        } else {
            const data = await response.json();
            notification('error', data.message);
        }
    }
    return {
        contextHolder,
        LITypeSecuritysWithChild,
        chageStatus,
        setInfo
    }
}
export default Uselogic;