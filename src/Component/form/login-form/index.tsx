import parse from 'device-detector-js';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserOutlined } from '@ant-design/icons';
import { VITE_URIAPI } from '../../../constant';
import InputController from '../../inputController';
interface AuthenticationResponse {
    isurl: boolean;
    istoken: boolean;
    url: string;
    token: any;
}
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [info, setinfo] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        getInfo();
    }, []);

    async function notification(type: 'success' | 'error', message: string) {
        await messageApi.open({
            type: type,
            content: message,
            duration: 1.5,
        });
    }

    async function getInfo() {
        const p = new parse();
        const device = p.parse(navigator.userAgent);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setinfo({ coord: { latitude: position.coords.latitude, longitude: position.coords.longitude }, device });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    const schema = useMemo(() => {
        return z.object({
            email: z.string().min(1, 'This field cannot be empty').email('Invalid email'),
            password: z.string().min(1, 'This field cannot be empty'),
        });
    }, []);

    type AuthInput = z.infer<typeof schema>;

    const { formState, control, handleSubmit } = useForm<AuthInput>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(schema),
        mode: 'onTouched',
    });

    const authentification = useCallback(async (email: string, password: string) => {
        setLoading(true);

        const JSONdata = {
            Mail: email,
            Password: password,
            info: { coord: { latitude: info.latitude, longitude: info.longitude }, device: info.device },
        };

        try {
            const response = await fetch(VITE_URIAPI + '/authentification', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(JSONdata),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                const authyResponse: AuthenticationResponse = responseData.valiny;
                if (authyResponse.isurl) {
                    await notification('success', 'User Authenticated').then(() => { navigate(authyResponse.url); });
                }
                if (authyResponse.istoken) {
                    localStorage.setItem('token', authyResponse.token);
                    await notification('success', 'User Authenticated').then(() => { navigate('/acceuil'); });
                }
            } else {
                await notification('error', responseData.error).then(() => { navigate('/'); });

            }
        } catch (error) {
            await notification('error', 'An error occurred. Please try again.').then(() => { navigate('/'); });
        } finally {
            setLoading(false);
        }
    }, [info]);

    const onSubmit = useCallback(async (values: AuthInput) => {
        try {
            await authentification(values.email, values.password);
        } catch (error) {
            console.log(error);
        }
    }, [authentification]);

    return (<form onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <div className="space-y-5 min-h-min p-4">
            <InputController
                control={control}
                name="email"
                formState={formState}
                label='email'
                type='text'
                prefix={<UserOutlined />}
                className={"h-11"}
            />
            <InputController
                control={control}
                name="password"
                formState={formState}
                label='password'
                type='password'
                className={"h-11"}
            />
            <div>
                <a href="#forgot" className="text-blue-600">Forgot your password?</a>
            </div>
            <Button htmlType="submit" loading={loading} className="w-full bg-green-500 text-white h-11 font-blinkmacsystem">
                Sign In
            </Button>
            <div>
                Don't have an account? <Link to="/Register" className="text-blue-600">Sign Up</Link>
            </div>
        </div>
    </form>)
}
export default LoginForm;