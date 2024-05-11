import { UserOutlined, MobileOutlined, EnvironmentOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import InputController from "../../inputController";
import { useCallback, useMemo, useState } from "react";
import { VITE_URIAPI } from "../../../constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoticeType } from "antd/es/message/interface";
import { useForm } from "react-hook-form";
import { z } from "zod";
import country from "country-codes-list";
const RegisterForm = () => {
    const uri = VITE_URIAPI;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [countrycode, setcountrycode] = useState("261");
    const [messageApi, contextHolder] = message.useMessage();
    const [ConfPassword, setConfPassword] = useState('');
    async function notification(type: NoticeType, message: string) {
        await messageApi.open({
            type: type,
            content: message,
            duration: 1.5
        })
    }

    const schema = useMemo(() => {
        return z.object({
            Name: z.string().min(1, 'This field cannot be empty'),
            LastName: z.string().min(1, 'This field cannot be empty'),
            PhoneNumber: z.string().min(1, 'This field cannot be empty'),
            DateBirth: z.string().refine((dateString) => {
                const dateOfBirth = new Date(dateString);
                const ageDiffMs = Date.now() - dateOfBirth.getTime();
                const ageDate = new Date(ageDiffMs);
                const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                return age > 10;
            }, 'You must be at least 10 years old'),
            Address: z.string().min(1, 'This field cannot be empty'),
            Mail: z.string().min(1, 'This field cannot be empty').email('Invalid email'),
            password: z.string().min(8, 'Password must be at least 8 characters long').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
        });
    }, []);

    type AuthInput = z.infer<typeof schema>;

    const { formState, control, handleSubmit, setValue, getValues } = useForm<AuthInput>({
        defaultValues: {
            Mail: '',
            password: '',
            Address: '',
            DateBirth: '',
            LastName: '',
            Name: '',
            PhoneNumber: ''
        },
        resolver: zodResolver(schema),
        mode: 'onTouched',
    });

    const setTempConfPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfPassword(event.target.value);
    }
    const createusers = useCallback(async (Name: string, LastName: string, PhoneNumber: string, DateBirth: string, Address: string, Password: string, Mail: string) => {
        setLoading(true)
        const formData = new FormData();
        formData.append('Name', Name);
        formData.append('LastName', LastName);
        formData.append('PhoneNumber', "+" + countrycode + PhoneNumber);
        formData.append('DateBirth', DateBirth);
        formData.append('Address', Address);
        formData.append('Password', Password);
        formData.append('Mail', Mail);

        const response = await fetch(uri + '/Register', {
            method: 'POST',
            body: formData
        });
        const valiny = await response.json();
        if (response.ok) {
            notification('success', valiny.message).then(() => { navigate("/") });

        } else {
            notification('error', valiny.error);
        }
        setLoading(false)
    }, [])
    const onSubmit = useCallback(async (values: AuthInput) => {
        try {
            await createusers(values.Name, values.LastName, values.PhoneNumber, values.DateBirth, values.Address, values.password, values.Mail);
        } catch (error) {
            console.log(error);
        }
    }, [createusers]);
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-1 p-3">
        {contextHolder}
        <div className="space-x-2 flex items-center">
            <InputController
                control={control}
                name="Name"
                label="Name"
                formState={formState}
                type="text"
                suffix={<UserOutlined />}
            />
            <InputController
                control={control}
                name="LastName"
                label="Last name"
                formState={formState}
                type="text"
                suffix={<UserOutlined />}
            />
        </div>
        <div className="mt-3">
            {formState.errors.DateBirth && (
                <div className="text-red-500 text-xs">{formState.errors.DateBirth.message}</div>
            )}
            <DatePicker
                className="h-10 w-full rounded-sm"
                picker="date"
                onChange={(e) => { setValue("DateBirth", e ? e.toISOString() : new Date().toISOString()) }}
            >
            </DatePicker>
        </div>
        <div>
            <select className="mt-3 h-11 w-full border" defaultValue={countrycode} onChange={(e) => {
                setcountrycode(e.target.value)
            }}>
                {country.all().map((e, index) => (
                    <option key={index} value={e["countryCallingCode"]}>{e["countryNameEn"]}</option>
                ))}
            </select>
        </div>
        <div>
            <InputController
                control={control}
                name="PhoneNumber"
                label="Phone number"
                formState={formState}
                type="text"
                prefix={"+" + countrycode + " "}
                suffix={<MobileOutlined />}
            />
        </div>
        <div>
            <InputController
                control={control}
                name="Address"
                label="Address"
                formState={formState}
                type="text"
                suffix={<EnvironmentOutlined />}
            />
        </div>
        <div>
            <InputController
                control={control}
                name="Mail"
                label="your email"
                formState={formState}
                type="text"
                suffix={<MailOutlined />}
            />
        </div>
        <div>
            <InputController
                control={control}
                name="password"
                label="password"
                formState={formState}
                type="password"
                suffix={<LockOutlined />}
            />
        </div>
        <div>
            <Input
                placeholder="Confirm password"
                type="password"
                className={`h-11 rounded-sm ${ConfPassword != getValues("password")&& `border-red-500`}`}
                suffix={<LockOutlined />}
                onChange={(e) => { setConfPassword(e.target.value) }}
            />
        </div>
        <div className="mt-3">
            <Button htmlType="submit" disabled={ConfPassword == getValues("password") && getValues("password") !== "" ? false : true} loading={loading} className="bg-green-500 text-white h-10 w-full font-blinkmacsystem mt-4">
                Sign up
            </Button>
        </div>
        <div className="min-h-min flex items-center  justify-center font-blinkmacsystem">
            <div className="mt-3">already have account ? <Link className="text-blue-600" to="/login"> login in</Link></div>
        </div>
    </form>)
}
export default RegisterForm;