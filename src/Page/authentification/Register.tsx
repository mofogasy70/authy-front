import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { NoticeType } from "antd/es/message/interface";
import { VITE_URIAPI } from "../../constant";
import "../../assets/scroolbar.css"
import { Link } from "react-router-dom";
import { svgBackground } from "../../assets/image/svg";
const Register: React.FC = () => {
    const [contentButton, setcontentButton] = useState<any>("singn up");
    const [statButton, setstatButton] = useState<boolean>(false);
    const [PassCss, setPasscss] = useState<string>("rounded-sm h-10 border-r-red-500");
    const uri = VITE_URIAPI;
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [DateBirth, setDateBirth] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfPassword, setConfPassword] = useState('');
    const [Mail, setMail] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };


    const setTempName = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
    const setTempLastName = (event: React.ChangeEvent<HTMLInputElement>) => { setLastName(event.target.value); }
    const setTempPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const setTempConfPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfPassword(event.target.value);
    }
    const setTempDateBirth = (event: React.ChangeEvent<HTMLInputElement>) => { setDateBirth(event.target.value); }
    const setTempAddress = (event: React.ChangeEvent<HTMLInputElement>) => { setAddress(event.target.value); }
    const setTempPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => { setPhoneNumber(event.target.value); }
    const setTempMail = (event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value); }
    const [messageApi, contextHolder] = message.useMessage();
    function notification(type: NoticeType, message: string) {
        messageApi.open({
            type: type,
            content: message,
        });
    }
    function verifPass() {
        if (ConfPassword !== Password) {
            setPasscss("rounded-sm h-10 border-red-500")
            setstatButton(true);
        }
        else {
            setPasscss("rounded-sm h-10")
            setstatButton(false)
        }
    }
    async function createusers() {
        const formData = new FormData();
        if (selectedImage) {
            formData.append('file', selectedImage);
        }
        formData.append('Name', Name);
        formData.append('LastName', LastName);
        formData.append('PhoneNumber', PhoneNumber);
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
            notification('success', valiny.message);
        } else {
            notification('error', valiny.error);
        }
    }
    useEffect(() => {
        verifPass();
    })
    return (
        <>
            <div className='flex h-screen items-center justify-center bg-cover bg-no-repeat bg-center  sticky top-0' style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgBackground)}")`, }}>
                {contextHolder}
                <div className="bg-white w-11/12 sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-min p-2 overflow-auto rounded-sm space-y-3 shadow-2xl font-blinkmacsystem border">
                    <div className="h-14 flex items-center justify-center">
                        <img className="h-full" src="./authylogo.png"></img>
                    </div>
                    <div className="text-xl h-10 p-2">Register :</div>
                    <Form>
                        <div className="min-h-min">
                            <div className="min-h-min space-y-3">
                                <div className="min-h-min flex items-center">
                                    <p className="hidden">Name:</p>
                                    <Input required className="rounded-sm w-6/12 h-10" placeholder="Name" value={Name} onChange={setTempName} />
                                    <div className="w-3"></div>
                                    <Input className="rounded-sm flex-grow h-10" placeholder="Last Name" value={LastName} onChange={setTempLastName} />
                                </div>
                                <div className="min-h-min flex items-center">
                                    <p className="hidden"></p>
                                    <p className="rounded-sm w-6/12 h-10 items-center justify-start p-3 flex">Date of birth:</p>
                                    <div className="w-3"></div>
                                    <Input className="rounded-sm flex-grow h-10" type='Date' placeholder="Your Date of Birth" value={DateBirth} onChange={setTempDateBirth} />
                                </div>
                                <div className="min-h-min flex items-center">
                                    <p className="hidden">telephone Number:</p>
                                    <Input className="rounded-sm w-2/12 h-10" placeholder="+261" value={PhoneNumber} onChange={setTempPhoneNumber} />
                                    <div className="w-3"></div>
                                    <Input className="rounded-sm flex-grow h-10" placeholder="Your Phone Number" value={PhoneNumber} onChange={setTempPhoneNumber} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Mail Adress:</p>
                                    <Input className="rounded-sm h-10" placeholder="Your mail adress" prefix={<UserOutlined />} value={Mail} onChange={setTempMail} />
                                </div>
                            </div>
                            <div className="min-h-min space-y-3 mt-1">
                                <div className="min-h-min items-center space-y-1 flex">
                                    {previewImage && <img className="h-20 rounded-full flex items-center justify-center" src={previewImage} alt="Aperçu" />}
                                    <div className="min-h-min">
                                        <input className="w-full h-10 p-2 " type="file" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Location:</p>
                                    <Input className="rounded-sm h-10" placeholder="Your location" value={Address} onChange={setTempAddress} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Password:</p>
                                    <Input.Password className="rounded-sm h-10" placeholder="Password" value={Password} onChange={setTempPassword} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Confirm Password:</p>
                                    <Input.Password className={PassCss} color="#E7E7E7" placeholder="Confirm the Password" value={ConfPassword} onChange={setTempConfPassword} />
                                </div>
                            </div>
                        </div>
                    </Form>
                    <div className="min-h-min flex items-center  justify-center">
                        <Button className="h-10 w-1/3 md:w-2/5 bg-red-500 text-white" disabled={statButton} onClick={createusers}>{contentButton}</Button>
                    </div>
                    <div className="min-h-min flex items-center  justify-center">
                        already have account? <Link className="text-blue-500" to="/login">login in</Link>
                    </div>
                    <div className='h-8 flex items-end justify-center'>
                        <p className='w-full h-1/3 text-xs text-center font-extralight'>Privacy policy | Legal notice</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register;