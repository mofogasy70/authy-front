import { Input, Button, message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import parse from 'device-detector-js';
import platform from 'platform';
import { VITE_URIAPI } from '../../constant';
import { svgBackground } from '../../assets/image/svg';
import { NoticeType } from 'antd/es/message/interface';
interface AuthenticationResponse {
    isurl: boolean;
    istoken: boolean;
    url: string;
    token: any
}
function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [contentButton, setcontentButton] = useState<any>("Sign in");
    const [statButton, setstatButton] = useState<boolean>(false);
    const navigate = useNavigate();
    const [Mail, setMail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [device, setdevice] = useState<any>();
    const settempMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMail(event.target.value);
    }
    const settempPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    function getInfo() {
        const p = new parse();
        const device = p.parse(navigator.userAgent);
        setdevice(device);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
        }
    }
    async function notification(type: NoticeType, message: string) {
        await messageApi.open({
            type: type,
            content: message,
            duration: 1.5
        })
    }
    async function authentification() {
        setcontentButton(<Spin />)
        setstatButton(true)
        const JSONdata = {
            Mail: Mail,
            Password: Password,
            info: { coord: { latitude, longitude }, device }
        };
        fetch(VITE_URIAPI + '/authentification', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(JSONdata)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((responsejson: any) => {
                    const authyResponse: AuthenticationResponse = responsejson.valiny;
                    if (authyResponse.isurl) {
                        notification("success", "user Authentifiate").then(() => { navigate(authyResponse.url) });
                    }
                    if (authyResponse.istoken) {
                        localStorage.setItem('token', authyResponse.token);
                        notification("success", "user Authentifiate").then(() => { navigate('/acceuil'); });
                    }
                });
            }
            else {
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
    useEffect(() => {
        getInfo();
        const info = platform.parse();
    }, []);
    return (
        <>
            {contextHolder}
            <div className='flex min-h-screen items-center justify-center font-blinkmacsystem bg-no-repeat bg-cover'>
                <div className='w-5/6 min-h-min bg-white shadow-2xl rounded-sm sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 border'>
                    <div className='h-1 bg-blue-500'></div>
                    <div className='space-y-5 min-h-min p-4'>
                        <p>Email</p>
                        <Input required prefix={<UserOutlined />} className='rounded-sm h-11' value={Mail} onChange={settempMail}></Input>
                        <p >Password</p>
                        <Input.Password required className='rounded-sm h-11' value={Password} onChange={settempPassword}></Input.Password>
                        <p><a href="#forgot" className='text-blue-600'>you forgot your password?</a></p>
                        <Button  disabled={statButton} className='w-full bg-blue-600 text-white rounded-sm h-11 font-blinkmacsystem' onClick={authentification}>{contentButton}</Button>
                        <p>You dont have account ? <Link to="/Register" className='text-blue-600'> Sign Up</Link></p>
                    </div>
                    <div className='hidden'>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;

