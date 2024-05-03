import { Button, Collapse, Table, TabsProps, Tag } from "antd";
import { useState, useEffect } from "react";
import { VITE_URIAPI } from "../../../constant";
import usersAPI from "../../../API/users";
import userService from "../../../service/user/userService";


const Uselogic = () => {
    const uri = VITE_URIAPI;
    const [LUser, setLUser] = useState<any[]>();
    const [LuserLoading, setLuserLoading] = useState<boolean>(false);
    const [Lroles, setLroles] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpendelte, setIsModalOpendelete] = useState(false);
    const [key, setKey] = useState<string>("1");

    const [Id, setId] = useState('');
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [DateBirth, setDateBirth] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfPassword, setConfPassword] = useState('');
    const [Role, setRole] = useState('');
    const [Mail, setMail] = useState('');

    const setTempName = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
    const setTempLastName = (event: React.ChangeEvent<HTMLInputElement>) => { setLastName(event.target.value); }
    const setTempPassword = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); }
    const setTempConfPassword = (event: React.ChangeEvent<HTMLInputElement>) => { setConfPassword(event.target.value); }
    const setTempDateBirth = (event: React.ChangeEvent<HTMLInputElement>) => { setDateBirth(event.target.value); }
    const setTempAddress = (event: React.ChangeEvent<HTMLInputElement>) => { setAddress(event.target.value); }
    const setTempPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => { setPhoneNumber(event.target.value); }
    const setTempMail = (event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value); }

    const showModal = () => { setIsModalOpen(true); };
    const handleOk = () => { createUsers(); window.location.reload(); setIsModalOpen(false); };
    const handleCancel = () => { setIsModalOpen(false); };

    const showModaldelete = (id: string) => { setId(id); setIsModalOpendelete(true); };
    const handleOkdelete = () => { deleteUsers(Id); window.location.reload(); setIsModalOpen(false); };
    const handleCanceldelete = () => { setIsModalOpendelete(false); };

    const token = localStorage.getItem('token');

    async function deleteUsers(id: string) {
        usersAPI.delete(id)
    };
    async function createUsers() {
        const JSONdata = {
            Name: Name,
            LastName: LastName,
            DateBirth: DateBirth,
            Address: Address,
            Password: Password,
            Role: Role,
            PhoneNumber: PhoneNumber,
            Mail: Mail
        };
        usersAPI.create(JSONdata);
    }

    useEffect(() => {
        fetchclient();
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'Name', key: 'Name', },
        { title: 'LastName', dataIndex: 'LastName', key: 'LastName', },
        { title: 'Date of Birth ', dataIndex: 'DateBirth', key: 'DateBirth', },
        { title: 'Phone Number', dataIndex: 'PhoneNumber', key: 'PhoneNumber', },
        { title: 'Password', dataIndex: 'Password', key: 'Password', },
        { title: 'Role', render: (User: any) => (<>{User.Role.Name}</>), key: "role" },
        { render: (User: any) => (<Button className="bg-blue-500 text-white">Edit</Button>), key: "edit" },
    ];
    const onChange = (key: string) => {
        switch (key) {
            case "1":
                fetchclient();
                break;
            case "2":
                fetchdev();
                break;
            case "3":
                fetchadmin();
                break;
            default:
                fetchclient();
                break;
        }
        setKey(key);
    };
    const items: TabsProps['items'] = [
        {
            key: "1",
            label: <Tag color="green-inverse">Users</Tag>,
            children:
                <div>
                    <Collapse 
                        items={[{
                            key: '1', label: 'search Pan', children:
                                <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                                    <div><Button className="bg-blue-500 text-white">search</Button></div>
                                </div>
                        }]}
                    />
                    <div>
                        <Table className="font-blinkmacsystem border mt-2" loading={LuserLoading} pagination={false} dataSource={LUser} columns={columns} />
                        <br />
                        <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
                    </div>
                </div>
        },
        {
            key: "2",
            label: <Tag color="orange-inverse">Developer</Tag>,
            children:
                <div>
                    <Collapse 
                        items={[{
                            key: '1', label: 'search Pan', children:
                                <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                                    <div><Button className="bg-blue-500 text-white">search</Button></div>
                                </div>
                        }]}
                    />
                    <div>
                        <Table className="font-blinkmacsystem border mt-2" loading={LuserLoading} pagination={false} dataSource={LUser} columns={columns} />
                        <br />
                        <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
                    </div>
                </div>
        },
        {
            key: "3",
            label: <Tag color="red-inverse">Admin</Tag>,
            children:
                <div>
                    <Collapse 
                        items={[{
                            key: '1', label: 'search Pan', children:
                                <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                                    <div><Button className="bg-blue-500 text-white">search</Button></div>
                                </div>
                        }]}
                    />
                    <div>
                        <Table className="font-blinkmacsystem border mt-2" loading={LuserLoading} pagination={false} dataSource={LUser} columns={columns} />
                        <br />
                        <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
                    </div>
                </div>
        }
    ];
    const fetchclient = async () => {
        try {
            setLuserLoading(true);
            setLUser(await userService.getclient());
            setLuserLoading(false);
        } catch (error) {
            alert(error)
        }
    };
    const fetchadmin = async () => {
        try {
            setLuserLoading(true);
            setLUser(await userService.getAdmin());
            setLuserLoading(false);
        } catch (error) {
            alert(error)
        }
    };
    const fetchdev = async () => {
        try {
            setLuserLoading(true);
            setLUser(await userService.getDev());
            setLuserLoading(false);
        } catch (error) {
            alert(error)
        }
    };

    return {
        LUser, columns, showModal, isModalOpen, handleOk, handleCancel, Name, setTempName, LastName, setTempLastName,
        DateBirth, setTempDateBirth, PhoneNumber, setTempPhoneNumber, Mail, setTempMail, setRole, Lroles, Address, setTempAddress,
        Password, setTempPassword, ConfPassword, setTempConfPassword, isModalOpendelte, handleOkdelete, handleCanceldelete, key, items, onChange
    }
}
export default Uselogic;