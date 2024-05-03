import { Col, Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { NoticeType } from 'antd/es/message/interface';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { VITE_URIAPI } from '../../constant';
interface AuthenticationResponse {
    isurl: boolean;
    istoken: boolean;
    url: string;
    token: any
}
const Confirm: React.FC = () => {
    const navigate = useNavigate();
    const { tokenConfirm } = useParams();
    const [code, setcode] = useState<string>();
    const [messageApi, contextHolder] = message.useMessage();

    const settempcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setcode(event.target.value);
    }

    function notification(type: NoticeType, message: string) {
        messageApi.open({
            type: type,
            content: message,
        });
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    useEffect(() => {
        if (tokenConfirm) {
            const tokenConfirmDecode: any = jwtDecode(tokenConfirm);
            const JSONdata = {
                UserApplications: tokenConfirmDecode.UserApplications,
                Security: tokenConfirmDecode.Security
            };
            const send = async () => {
                const response = await fetch(VITE_URIAPI +'/Security/Init', {
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
                    notification('error', data.error);
                }
            }
            send();
        }
    }, []);
    async function verif() {
        if (tokenConfirm) {
            const tokenConfirmDecode: any = jwtDecode(tokenConfirm);
            const JSONdata = {
                object: code,
                Security: tokenConfirmDecode.Security,
                UserApplications: tokenConfirmDecode.UserApplications,
            };
            const response = await fetch(VITE_URIAPI +'/Security/Check', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(JSONdata)
            });
            if (response.ok) {
                const data = await response.json();
                const authyResponse: AuthenticationResponse = data.message;
                authyResponseAction(authyResponse);
            } else {
                const data = await response.json();
                notification('error', data.error);
            }
        }
    }
    function authyResponseAction(authyResponse:AuthenticationResponse) {
        if (window.opener) {
            let donnees;
            authyResponse.istoken ? donnees = { message: authyResponse.token } : new Error("error durring get accestoken!");
            donnees = { message: authyResponse.token };
            window.opener.postMessage(donnees, "*");
            window.close();
        }
        else {
            if (authyResponse.isurl) {
                authyResponse.url ? window.location.href = authyResponse.url : new Error("error durring get url redirection!");
            } else {
                localStorage.setItem('token', authyResponse.token);
                navigate('/acceuil');
            }
        }   
    }
    async function resend() {
        const response = await fetch(VITE_URIAPI +'/API/Code/resend', {
            method: 'GET',
            headers: headers
        });
        if (response.ok) {
            const data = await response.json();
            notification('success', data.message);
        } else {
            const data = await response.json();
            notification('error', data.error);
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            {contextHolder}
            <div className='w-11/12 min-h-min p-2 shadow-lg flex items-center justify-center md:w-2/6'>
                <div className='min-h-min'>
                    <div className='flex items-center justify-center' >
                        <div className='min-h-min'>
                            <img className='h-36' src='../../assets/authylogo.png'></img>
                            <p className='text-center mb-2'>Two-Factor Authentication Required</p>
                        </div>
                    </div>
                    <div>
                        <p>Enter the verification code you received via SMS or generated using your authentication app!</p>
                    </div>
                    <br />
                    <div>
                        <div>
                            <p>No code received? Check your connection and ensure your contact information is correct</p>
                            <a href='#' style={{ border: 'none', color: 'blue' }} onClick={resend}>resend code verification</a>
                        </div>
                    </div>
                    <br />
                    <div>
                        <Input className='rounded-sm' value={code} onChange={settempcode}></Input>
                    </div>
                    <br />
                    <div>
                        <Button className='bg-green-500 text-white mb-2' onClick={verif}>Verifier</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Confirm;