import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VITE_URIAPI } from "../../../constant";

const UseLogic = () => {
    const uri = VITE_URIAPI;
    const token: any = localStorage.getItem('token');
    const headers = new Headers();
    const [LAccount, setLAccount] = useState<any[]>([]);
    headers.append('Content-Type', 'application/json');
    if (token) { headers.append('x-auth-token', token); }
    useEffect(() => {
        const fetchApp = async () => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (token) { headers.append('x-auth-token', token); }
            try {
                const response = await fetch(uri + '/API/UserApplication/findAppByUserId', {
                    method: 'GET',
                    headers: headers,
                });
                if (response.ok) {
                    const data = await response.json();
                    setLAccount(data);
                    console.log(data);
                } else {
                    throw new Error('Failed to fetch roles');
                }
            } catch (error) {
                alert(error);
            }
        };
        fetchApp();
    }, []);
    return {
        LAccount
    }
}
export default UseLogic;