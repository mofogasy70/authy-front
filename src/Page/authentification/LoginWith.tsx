import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Spin, Table, Tabs, TabsProps, Tag, message } from 'antd';
import parse from 'device-detector-js';
import { VITE_URIAPI } from '../../constant';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { LoadingOutlined } from '@ant-design/icons';
import { NoticeType } from 'antd/es/message/interface';
interface AuthenticationResponse {
    isurl: boolean;
    istoken: boolean;
    url: string;
    token: any;
    navigate: boolean
}

function LoginWith() {
    const [messageApi, contextHolder] = message.useMessage();
    const tableauStr = localStorage.getItem("Mail");
    const [tableauRecupere, settableauRecupere] = useState<[]>()
    let { AppID } = useParams()
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const settempEmail = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); };
    const settempPassword = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); };
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [device, setdevice] = useState<any>();
    const [css1, setcss1] = useState<string>("");
    const [css2, setcss2] = useState<string>("hidden");
    useEffect(() => {
        getInfo();
        tableauStr && settableauRecupere(JSON.parse(tableauStr));
    }, []);
    async function notification(type: NoticeType, message: string) {
        await messageApi.open({
            type: type,
            content: message,
            duration: 1.5
        })
    }

    async function authentification() {
        if (!AppID) {
            const App = localStorage.getItem("AppID");
            if (App) { AppID = App; }
        }
        const JSONdata = {
            Mail: email,
            Password: Password,
            AppID: AppID,
            info: { coord: { latitude, longitude }, device }
        };
        const to = VITE_URIAPI + '/authentification_2';
        await fetch(to, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(async (responsejson: any) => {
                    const authyResponse: AuthenticationResponse = responsejson.valiny;
                    if (authyResponse.navigate) {
                        await notification("success", "user Authentifiate").then(() => { navigate(authyResponse.url) });
                        navigate(authyResponse.url);
                    }
                    else {
                        await notification("success", "user Authentifiate").then(() => { navigate(authyResponse.url) });
                        await authyResponseAction(authyResponse);
                    }
                });
            }
            else {
                alert("sdfsd")
                response.json().then((responsejson: any) => {
                    notification("error", responsejson.error).then(() => { navigate('/') });
                });
            }
        }).catch((error) => {
            error.json().then((errorjson: any) => {
                notification("error", errorjson.error).then(() => { navigate('/') });
            });
        });
    }
    function getInfo() {
        const p = new parse();
        const device = p.parse(navigator.userAgent);
        console.log(device);
        setdevice(device);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude); console.log(position.coords.longitude);
                    setLatitude(position.coords.latitude); setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
        }
    }
    async function authyResponseAction(authyResponse: AuthenticationResponse) {
        try {
            const TD: any = jwtDecode(authyResponse.token);
            if (window.opener) {
                let donnees;
                authyResponse.istoken ? donnees = { message: authyResponse.token } : new Error("error durring get accestoken!");
                donnees = { message: authyResponse.token };
                window.opener.postMessage(donnees, "http://127.0.0.1:8080");
                await setTabMail(TD);
                window.close();
            } else {
                await setTabMail(TD);
                authyResponse.isurl ? window.location.href = authyResponse.url : new Error("error durring get url redirection!");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async function setTabMail(TD: any) {
        if (!localStorage.getItem("Mail")) {
            localStorage.setItem("Mail", JSON.stringify([TD.Mail]))
        }
        else {
            var tableauEnString = localStorage.getItem('Mail');
            let tableauRecupere: string[] = [];
            tableauEnString && (tableauRecupere = JSON.parse(tableauEnString));
            if (!tableauRecupere.includes(TD.Mail)) {
                tableauRecupere.push(TD.Mail);
            }
            localStorage.setItem("Mail", JSON.stringify(tableauRecupere));
        }
    }
    const onChange = (key: string) => {
        console.log(key);
    };
    const columns = [
        {
            title: 'Mail',
            render: (User: any) => (<div onClick={() => {
                setEmail(User);
                setcss2("rounded-sm h-11");
                setcss1("hidden");
            }} className='w-full h-full border-none'>{User}</div>),
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: 'new',
            label: <Tag color="green">New</Tag>,
            children: <div className="space-y-3 font-blinkmacsystem">
                <div><p>Email</p></div>
                <div><Input className='rounded-sm h-11' placeholder='your mail Adress' onChange={settempEmail} /></div>
                <div><p>Password</p></div>
                <div><Input.Password className='rounded-sm h-11' placeholder='your Password' onChange={settempPassword} /></div>
                <div className='flex justify-start items-center h-11'>
                    <div className='w-1/2 h-full text-blue-500 flex items-center justify-center'><a href="ert"> Forgot Password ?</a></div>
                    <Button onClick={authentification} className='bg-blue-500 text-white h-full rounded-sm w-1/2'>Next</Button>
                </div>
            </div>,
        },
        {
            key: 'existing',
            label: <Tag color="cyan">Existing</Tag>,
            children: <div className="space-y-3 font-blinkmacsystem">
                <div>choose the account :</div>
                <div className={css1}><Table pagination={false} dataSource={tableauRecupere} columns={columns}></Table></div>
                <div className={css2}><p>Email</p></div>
                <div className={css2}><Input className='rounded-sm h-11' placeholder='your mail Adress' value={email} onChange={settempEmail} /></div>
                <div className={css2}><p>Email</p></div>
                <div className={css2}><Input.Password className='rounded-sm h-11' placeholder='your Password' onChange={settempPassword} /></div>
                <div className={css2}>
                    <Button onClick={authentification} className='bg-blue-500 text-white w-1/2 h-full'>Next</Button>
                </div>
            </div>,
        }
    ];

    return (
        <div className="flex min-h-screen items-center justify-center font-blinkmacsystem">
            {contextHolder}
            <div className='p-4 w-5/6 min-h-min bg-white shadow-lg rounded-sm sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 space-y-3 border'>
                <div className='flex min-h-min items-center justify-center'>
                    <img className='h-20' src='/authylogo.png' />
                </div>
                <p>sign with Authy:</p>
                <div><Tabs defaultActiveKey="new" items={items} onChange={onChange} /></div>
                <div className='h-3'></div>
            </div>
        </div>
    );
}
export default LoginWith;