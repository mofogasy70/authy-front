import { useEffect, useRef, useState } from "react";
import userService from "../../../service/user/userService";
import jwtDecode from "jwt-decode";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import usersAPI from "../../../API/users";
import daysj from "dayjs";

const UseLogic = () => {
    const [Name, setName] = useState<string>("undefind");
    const [LastName, setLastName] = useState<string>("undefind");
    const [DateBirth, setDateBirth] = useState<string>("undefind");
    const [Address, setAddress] = useState<string>("undefind");
    const [PhoneNumber, setPhoneNumber] = useState<string>("undefind");
    const [Password, setPassword] = useState<string>("undefind");
    const [avatar, setAvatar] = useState<string>("undefind");
    const [Mail, setMail] = useState<string>("undefind");
    const [messageApi, contextHolder] = message.useMessage();

    const [NameINP, setNameINP] = useState<boolean>(false);
    const [LastNameINP, setLastNameINP] = useState<boolean>(false);
    const [DateBirthINP, setDateBirthINP] = useState<boolean>(false);
    const [AddressINP, setAddressINP] = useState<boolean>(false);
    const [PhoneNumberINP, setPhoneNumberINP] = useState<boolean>(false);

    const [NameINP_T, setNameINP_T] = useState<string>('');
    const [LastNameINP_T, setLastNameINP_T] = useState<string>('');
    const [DateBirthINP_T, setDateBirthINP_T] = useState<string>('');
    const [AddressINP_T, setAddressINP_T] = useState<string>('');
    const [PhoneNumberINP_T, setPhoneNumberINP_T] = useState<string>('');
    const [tabref, settabref] = useState(userService.getref());

    const passwordSectionRef = useRef<HTMLElement | null>(null);

    const settempNameINP_T = (event: React.ChangeEvent<HTMLInputElement>) => {setNameINP_T(event.target.value);}
    const settempLastNameINP_T = (event: React.ChangeEvent<HTMLInputElement>) => { setLastNameINP_T(event.target.value); }
    const settempDateBirthINP_T = (event: React.ChangeEvent<HTMLInputElement>) => { setDateBirthINP_T(event.target.value); }
    const settempAddressINP_T = (event: React.ChangeEvent<HTMLInputElement>) => { setAddressINP_T(event.target.value); }
    const settempPhoneNumberINP_T = (event: React.ChangeEvent<HTMLInputElement>) => { setPhoneNumberINP_T(event.target.value); }


    useEffect(() => {
        const token: any = localStorage.getItem('token');
        const decode: any = jwtDecode(token);
        const uS = usersAPI;
        uS.setToken(token).findById(decode.UserId).then((data) => {
            setName(data.Name);
            setLastName(data.LastName);
            setDateBirth(daysj(new Date(data.DateBirth)).format("dddd D MMMM YYYY"));
            setAddress(data.Address);
            setPhoneNumber(data.PhoneNumber);
            setAvatar(data.Avatar);
            setMail(data.Mail);
            setPassword("****");
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    function notification(type: NoticeType, message: string) {
        messageApi.open({
            type: type,
            content: message,
            duration: 1
        }).then(() => {
            window.location.reload();
        });
    }
    return {
        Name,
        LastName,
        DateBirth,
        Address,
        PhoneNumber,
        Password,
        avatar,
        Mail,
        NameINP,
        LastNameINP,
        DateBirthINP,
        AddressINP,
        PhoneNumberINP,
        NameINP_T,
        LastNameINP_T,
        DateBirthINP_T,
        AddressINP_T,
        PhoneNumberINP_T,
        tabref,
        passwordSectionRef,
        contextHolder,
        setNameINP,
        setLastNameINP,
        setDateBirthINP,
        setAddressINP,
        setPhoneNumberINP,
        settempNameINP_T,
        settempLastNameINP_T,
        settempDateBirthINP_T,
        settempAddressINP_T,
        settempPhoneNumberINP_T,
        notification,
        userService
    }
}
export default UseLogic;
