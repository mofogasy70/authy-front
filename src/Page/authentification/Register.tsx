import { Button, DatePicker, Input, message } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { NoticeType } from "antd/es/message/interface";
import { VITE_URIAPI } from "../../constant";
import "../../assets/scroolbar.css"
import { Link, useNavigate } from "react-router-dom";
import country from "country-codes-list";
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [countrycode, setcountrycode] = useState("261");
    const [contentButton, setcontentButton] = useState<any>("singn up");
    const [statButton, setstatButton] = useState<boolean>(false);
    const [PassCss, setPasscss] = useState<string>("rounded-sm h-11 border-r-red-500");
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
    const setTempAddress = (event: React.ChangeEvent<HTMLInputElement>) => { setAddress(event.target.value); }
    const setTempPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => { setPhoneNumber(event.target.value); }
    const setTempMail = (event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value); }
    const [messageApi, contextHolder] = message.useMessage();
    async function notification(type: NoticeType, message: string) {
        await messageApi.open({
            type: type,
            content: message,
            duration: 1.5
        })
    }
    function verifPass() {
        if (ConfPassword !== Password) {
            setPasscss("rounded-sm h-11 border-red-500")
            setstatButton(true);
        }
        else {
            setPasscss("rounded-sm h-11")
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
    }
    useEffect(() => {
        verifPass();
    })
    return (
        <>
            <div className='flex h-screen items-center justify-center bg-cover bg-no-repeat bg-center  sticky top-0'>
                {contextHolder}
                <div className="bg-white w-11/12 sm:w-10/12 md:w-7/12 lg:w-6/12 xl:w-4/12 min-h-min rounded-sm shadow-2xl font-blinkmacsystem border">
                    <div className="h-2 bg-blue-500"></div>
                    <div className="p-4 space-y-5">
                        <div className="min-h-min">
                            <div className="min-h-min space-y-3">
                                <div className="min-h-min flex items-center">
                                    <p className="hidden">Name:</p>
                                    <Input required className="rounded-sm w-6/12 h-11" placeholder="Name" value={Name} onChange={setTempName} />
                                    <div className="w-3"></div>
                                    <Input className="rounded-sm flex-grow h-11 font-blinkmacsystem" placeholder="Last Name" value={LastName} onChange={setTempLastName} />
                                </div>
                                <div className="min-h-min w-full">
                                    <DatePicker picker="date" className="rounded-sm grow h-11 w-full" placeholder="Your Date of Birth" onChange={(e) => { setDateBirth(e && e.date.toString() || "") }} />
                                </div>
                                <div className="min-h-min flex items-center">
                                    <select className="p-1 w-6/12 h-11 border" defaultValue={countrycode} onChange={(e) => {
                                        setcountrycode(e.target.value)
                                    }}>
                                        {country.all().map((e, index) => (
                                            <option key={index} value={e["countryCallingCode"]}>{e["countryNameEn"]}</option>
                                        ))}
                                    </select>
                                    <div className="w-3"></div>
                                    <Input prefix={"+" + countrycode} className="rounded-sm flex-grow h-11" placeholder="Your Phone Number" value={PhoneNumber} onChange={setTempPhoneNumber} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Mail Adress:</p>
                                    <Input className="rounded-sm h-11" placeholder="Your mail adress" prefix={<UserOutlined />} value={Mail} onChange={setTempMail} />
                                </div>
                            </div>
                            <div className="min-h-min space-y-3 mt-1">
                                <div className="min-h-min items-center space-y-1 flex">
                                    {previewImage && <img className="h-20 rounded-full flex items-center justify-center" src={previewImage} alt="Aperçu" />}
                                    <div className="min-h-min">
                                        <input className="w-full h-11 p-2 " type="file" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Location:</p>
                                    <Input className="rounded-sm h-11" placeholder="Your location" value={Address} onChange={setTempAddress} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Password:</p>
                                    <Input.Password className="rounded-sm h-11" placeholder="Password" value={Password} onChange={setTempPassword} />
                                </div>
                                <div className="min-h-min sm:flex items-center">
                                    <p className="hidden">Confirm Password:</p>
                                    <Input.Password className={PassCss} color="#E7E7E7" placeholder="Confirm the Password" value={ConfPassword} onChange={setTempConfPassword} />
                                </div>
                            </div>
                        </div>
                        <div className="min-h-min flex items-center  justify-center">
                            <Button className="w-full bg-blue-600 text-white rounded-sm h-11 font-blinkmacsystem" disabled={statButton} onClick={createusers}>{contentButton}</Button>
                        </div>
                        <div className="min-h-min flex items-center  justify-center font-blinkmacsystem">
                            <p>already have account ? <Link className="text-blue-600" to="/login"> login in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register;