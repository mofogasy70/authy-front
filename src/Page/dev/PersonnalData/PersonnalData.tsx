import { Avatar, Breadcrumb, Button, Card, Input, Popconfirm } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined, FormOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import UseLogic from "../../../hooks/logics/user/PersonnalData";
import { VITE_URIAPI } from "../../../constant";
const PersonnalData: React.FC = () => {
    const {
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
    } = UseLogic();
    return (
        <div className="min-h-min space-y-1">
            {contextHolder}
            <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
                <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item className="md:text-base">Personnal Data</Breadcrumb.Item>
            </Breadcrumb>
            <Card title="General informations" className="w-full min-h-min p-1 bg-white rounded-lg shadow-lg font-blinkmacsystem">
                <div className="w-full md:flex space-y-2 md:space-y-0">
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center"><div>Avatar:</div></div>
                    <div className="flex-grow flex items-center justify-center"><Avatar size={100} src={VITE_URIAPI+avatar} /></div>
                    <div className="w-full md:w-2/12 flex items-center justify-start"><Popconfirm title="" okText="Yes"
                        cancelText="No"><Button className="bg-blue-500 text-white font-blinkmacsystem">change Avatar</Button></Popconfirm></div>
                </div>
                <section className="w-full md:flex md:h-14 space-y-2 md:space-y-0" id="Name" ref={userService.getrefvalue("Name", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center"><div>Name :</div></div>
                    <div className={NameINP ? "flex-grow items-center justify-center hidden" : "flex-grow flex items-center justify-center"}>{Name}</div>
                    <div className={NameINP ? "flex-grow items-center justify-center flex" : "flex-grow hidden items-center justify-center"}>
                        <Input
                            placeholder={Name}
                            className="h-11 w-full sm:w-1/2"
                            suffix={
                                <div className="h-full">
                                    <Button onClick={() => { setNameINP(false) }} icon={<CloseCircleTwoTone twoToneColor="#EB3324" />} className="bg-red-500 h-full"></Button>
                                    <Button onClick={() => { userService.updateName({ name: NameINP_T, notification }); }} className="bg-green-500 h-full p-1" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}></Button>
                                </div>}
                            value={NameINP_T}
                            onChange={settempNameINP_T}>
                        </Input>
                    </div>
                    <div className="w-full md:w-2/12 flex items-center justify-start">
                        <Button onClick={() => {
                            setNameINP(true)
                        }}><EditOutlined />
                        </Button>
                    </div>
                </section>
                <section className="w-full md:flex md:h-14" id="LastName" ref={userService.getrefvalue("LastName", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Last Name :</div></div>
                    <div className={LastNameINP ? "flex-grow items-center justify-center hidden" : "flex-grow flex items-center justify-center"}>{LastName}</div>
                    <div className={LastNameINP ? "flex-grow items-center justify-center flex" : "flex-grow hidden items-center justify-center"}>
                        <Input
                            placeholder={LastName}
                            className="h-11 w-full sm:w-1/2"
                            suffix={
                                <div className="h-full">
                                    <Button onClick={() => { setLastNameINP(false) }} icon={<CloseCircleTwoTone twoToneColor="#EB3324" />} className="bg-red-500 h-full"></Button>
                                    <Button onClick={() => { userService.updateLastName({ lastname: LastNameINP_T, notification }); }} className="bg-green-500 h-full" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}></Button>
                                </div>}
                            value={LastNameINP_T}
                            onChange={settempLastNameINP_T}>
                        </Input>
                    </div>
                    <div className="w-full md:w-2/12 flex items-center justify-start">
                        <Button onClick={() => { setLastNameINP(true) }}><EditOutlined /></Button>
                    </div>
                </section>
                <section className="w-full md:flex md:h-14" id="DateBirth" ref={userService.getrefvalue("DateBirth", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Birth Date :</div></div>
                    <div className={DateBirthINP ? "flex-grow items-center justify-center hidden" : "flex-grow flex items-center justify-center"}>{DateBirth}</div>
                    <div className={DateBirthINP ? "flex-grow items-center justify-center flex" : "flex-grow hidden items-center justify-center"}>
                        <Input
                            placeholder={DateBirth}
                            type="Date"
                            className="h-11 w-full sm:w-1/2"
                            suffix={
                                <div className="h-full">
                                    <Button onClick={() => { setDateBirthINP(false) }} icon={<CloseCircleTwoTone twoToneColor="#EB3324" />} className="bg-red-500 h-full"></Button>
                                    <Button onClick={() => { userService.updateDateBirth({ datebirth: DateBirthINP_T, notification }); }} className="bg-green-500 h-full" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}></Button>
                                </div>
                            }
                            value={DateBirthINP_T}
                            onChange={settempDateBirthINP_T}>
                        </Input>
                    </div>
                    <div className="w-full md:w-2/12 flex items-center justify-start">
                        {DateBirthINP ? <></> : <Button onClick={() => { setDateBirthINP(true) }}><EditOutlined /></Button>}
                    </div>
                </section>
            </Card>
            <Card title="Address" className="w-full min-h-min p-1 bg-white rounded-lg shadow-lg font-blinkmacsystem" >
                <div className="w-full md:flex">
                    <p>Your personal and professional addresses are used to personalize your experience on
                        the Aro-ko platform and also allows you to strengthen the security of your account.</p>
                </div >
                <section id="Address" className="w-full md:flex md:h-14" ref={userService.getrefvalue("Address", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Address :</div></div>
                    <div className={AddressINP ? "flex-grow items-center justify-center hidden" : "flex-grow flex items-center justify-center"}>{Address}</div>
                    <div className={AddressINP ? "flex-grow items-center justify-center flex" : "flex-grow hidden items-center justify-center"}>
                        <Input
                            placeholder={Address}
                            className="h-11 w-full sm:w-1/2"
                            suffix={
                                <div className="h-full">
                                    <Button onClick={() => { setAddressINP(false) }} icon={<CloseCircleTwoTone twoToneColor="#EB3324" />} className="bg-red-500 h-full"></Button>
                                    <Button onClick={() => { userService.updateAddress({ address: AddressINP_T, notification }); }} className="bg-green-500 h-full" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}></Button>
                                </div>}
                            value={AddressINP_T}
                            onChange={settempAddressINP_T}>
                        </Input>
                    </div>
                    <div className="w-full md:w-2/12 flex items-center justify-start">
                        {AddressINP ? <></> : <Button onClick={() => { setAddressINP(true) }}><EditOutlined /></Button>}
                    </div>
                </section>
                <section id="PhoneNumber" className="w-full md:flex md:h-14" ref={userService.getrefvalue("PhoneNumber", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Phone number :</div></div>
                    <div className={PhoneNumberINP ? "flex-grow items-center justify-center hidden" : "flex-grow flex items-center justify-center"}>{PhoneNumber}</div>
                    <div className={PhoneNumberINP ? "flex-grow items-center justify-center flex" : "flex-grow hidden items-center justify-center"}>
                        <div className="flex">
                            <Input className="w-1/5"></Input>
                            <div className="w-1"></div>
                            <Input
                                placeholder={PhoneNumber}
                                className="h-11 w-full flex-grow"
                                suffix={
                                    <div className="h-full">
                                        <Button onClick={() => { setPhoneNumberINP(false) }} icon={<CloseCircleTwoTone twoToneColor="#EB3324" />} className="bg-red-500 h-full"></Button>
                                        <Button onClick={() => { userService.updatePhoneNumber({ phoneNumber: PhoneNumberINP_T, notification }); }} className="bg-green-500 h-full" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}></Button>
                                    </div>}
                                value={PhoneNumberINP_T}
                                onChange={settempPhoneNumberINP_T}>
                            </Input>
                        </div>
                    </div>
                    <div className="w-full md:w-2/12 flex items-center justify-start">
                        {PhoneNumberINP ? <></> : <Button onClick={() => { setPhoneNumberINP(true) }}><EditOutlined /></Button>}
                    </div>
                </section>
                <section id="Mail" className="w-full md:flex md:h-14" ref={userService.getrefvalue("Mail", tabref)}>
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Mail :</div></div>
                    <div className="flex-grow flex items-center justify-center" >{Mail}</div>
                    <div className="w-full md:w-2/12 flex items-center justify-start" ><Popconfirm title="" okText="Yes"
                        cancelText="No" ><Button><EditOutlined /></Button></Popconfirm></div>
                </section>
            </Card>
            <Card title="Password" className="w-full min-h-min p-1 bg-white rounded-lg shadow-lg font-blinkmacsystem" >
                <div className="w-full md:flex">
                    <p>A strong password is one that is not easily guessed or brute-forced.
                        It should be long and complex, with a combination of upper- and lowercase letters,
                        special characters, and numbers.</p>
                </div>
                <section id="Password" ref={passwordSectionRef} className="w-full md:flex md:h-14 font-blinkmacsystem">
                    <div className="w-full md:w-2/12 md:flex md:items-center md:justify-center" ><div>Password :</div></div>
                    <div className="flex-grow flex items-center justify-center" >{Password}</div>
                    <div className="w-full md:w-2/12 flex items-center justify-start" ><Button icon={<FormOutlined />}></Button></div>
                </section>
            </Card>
            <div className="h-4"></div>
        </div>
    );
}
export default PersonnalData;