import { Button, Calendar, Collapse, Input, Table, TabsProps, Tag } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VITE_URIAPI } from "../../../constant";
import ApplicationService from "../../../service/Application/ApplicationService";

const Uselogic = () => {
    const uri = VITE_URIAPI;
    const [LApplication, setLApplication] = useState<any[]>([]);
    const [LApplaoding, setLlaoding] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [key, setKey] = useState<string>("2");

    const [DomainName, setDomainName] = useState('');
    const [Uri, setUri] = useState('');

    const [DomainName_s, setDomainName_s] = useState('');
    const [start_s, setstart_s] = useState('');
    const [end_s, setend_s] = useState('');

    const setTempDomainName_s = (event: React.ChangeEvent<HTMLInputElement>) => { setDomainName_s(event.target.value); }
    const setTempstart_s = (event: React.ChangeEvent<HTMLInputElement>) => { setstart_s(event.target.value); }
    const setTempend_s = (event: React.ChangeEvent<HTMLInputElement>) => { setend_s(event.target.value); }

    const setTempDomainName = (event: React.ChangeEvent<HTMLInputElement>) => { setDomainName(event.target.value); }
    const setTempUri = (event: React.ChangeEvent<HTMLInputElement>) => { setUri(event.target.value); }

    const showModal = () => { setIsModalOpen(true); };
    const handleOk = () => { createApplication(); window.location.reload(); setIsModalOpen(false); };
    const handleCancel = () => { setIsModalOpen(false); };



    async function createApplication() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (token) { headers.append('x-auth-token', token); }
        const JSONdata = {
            DomainName: DomainName,
            Uri: Uri
        };
        const response = await fetch(uri + '/API/Application', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
            const data = await response.json();
            alert(data);
        } else {
            const data = await response.json();
            alert(data);
        }
    }
    const fetchApplication_APR = async () => {
        try {
            setLlaoding(true);
            setLApplication(await ApplicationService.getApplication_APR())
            setLlaoding(false);
        } catch (error) {
            alert(error)
        }
    };
    const fetchApplicationNOT_APR = async () => {
        try {
            setLlaoding(true);
            setLApplication(await ApplicationService.getApplication_NOT_APR())
            setLlaoding(false);
        } catch (error) {
            alert(error)
        }
    };
    const fetchApplicationH_O = async () => {
        try {
            setLlaoding(true);
            setLApplication(await ApplicationService.getApplication_HO())
            setLlaoding(false);
        } catch (error) {
            alert(error)
        }
    };
    const onChange = (key: string) => {
        switch (key) {
            case "2":
                fetchApplication_APR();
                break;
            case "1":
                fetchApplicationH_O();
                break;
            case "0":
                fetchApplicationNOT_APR();
                break;
            default:
                fetchApplication_APR();
                break;
        }
        setKey(key);
    };
    const search= async ()=>{
        try {
            setLlaoding(true);
            setLApplication(await ApplicationService.search(key));
            setLlaoding(false);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        fetchApplication_APR();
        setLlaoding(false)
    }, []);

    const columns = [
        { title: 'Domain Name', dataIndex: 'DomainName', key: 'DomainName' },
        { title: 'UrL', dataIndex: 'Uri', key: 'Uri' },
        { title: 'created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Logo', dataIndex: 'Logo', key: 'Logo' },
        { render: (temp: any) => (<Link to={temp._id}><Button className="bg-blue-500 text-white">more...</Button></Link>), },
    ];


    const items: TabsProps['items'] = [
        {
            key: "2",
            label: <Tag color="green">Approved</Tag>,
            children:
                <div className="space-y-2">
                    <Collapse
                        items={[{
                            key: '1', label: 'search Pan', children: <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                                <div className="w-full">
                                    <p>Name</p>
                                    <Input name="name" value={DomainName_s} onChange={setTempDomainName_s} className="w-full" placeholder="Name of the apps"></Input>
                                </div>
                                <div className="w-full">
                                    <p>create in:</p>
                                    <div className="flex items-center justify-center w-full">
                                        <div className="w-1/2">
                                            <p>start</p>
                                            <Input name="start" value={start_s} onChange={setTempstart_s} type="Date"></Input>
                                        </div>
                                        <div className="w-1/2">
                                            <p>end</p>
                                            <Input name="end" value={end_s} onChange={setTempend_s} type="Date"></Input>
                                        </div>
                                    </div>
                                </div>
                                <div><Button onClick={search} className="bg-blue-500 text-white">search</Button></div>
                            </div>
                        }]}
                    />
                    <div>
                        <Table loading={LApplaoding} className="font-blinkmacsystem border" size={"small"} pagination={{ pageSize: 8 }} dataSource={LApplication} columns={columns} />
                    </div>
                </div>
        },
        {
            key: "1",
            label: <Tag color="orange">On Hold</Tag>,
            children: <div className="space-y-2">
                <Collapse
                    items={[{
                        key: '1', label: 'search Pan', children: <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                            <div className="w-full">
                                <p>Name</p>
                                <Input name="name" value={DomainName_s} onChange={setTempDomainName_s} className="w-full" placeholder="Name of the apps"></Input>
                            </div>
                            <div className="w-full">
                                <p>create in:</p>
                                <div className="flex items-center justify-center w-full">
                                    <div className="w-1/2">
                                        <p>start</p>
                                        <Input name="start" value={start_s} onChange={setTempstart_s} type="Date"></Input>
                                    </div>
                                    <div className="w-1/2">
                                        <p>end</p>
                                        <Input name="end" value={end_s} onChange={setTempend_s} type="Date"></Input>
                                    </div>
                                </div>
                            </div>
                            <div><Button onClick={search}  className="bg-blue-500 text-white">search</Button></div>
                        </div>
                    }]}
                />
                <div>
                    <Table loading={LApplaoding} className="font-blinkmacsystem border" size={"small"} pagination={{ pageSize: 8 }} dataSource={LApplication} columns={columns} />
                </div>
            </div>
        },
        {
            key: "0",
            label: <Tag color="red-inverse">disapprove</Tag>,
            children:
                <div className="space-y-2">
                    <Collapse
                        items={[{
                            key: '1', label: 'search Pan', children: <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem">
                                <div className="w-full">
                                    <p>Name</p>
                                    <Input name="name" value={DomainName_s} onChange={setTempDomainName_s} className="font-blinkmacsystem" placeholder="Name of the apps"></Input>
                                </div>
                                <div className="w-full">
                                    <p>create in:</p>
                                    <div className="flex items-center justify-center w-full">
                                        <div className="w-1/2">
                                            <p>start</p>
                                            <Input className="font-blinkmacsystem" name="start" value={start_s} onChange={setTempstart_s} type="Date"></Input>
                                        </div>
                                        <div className="w-1/2">
                                            <p>end</p>
                                            <Input className="font-blinkmacsystem" name="end" value={end_s} onChange={setTempend_s} type="Date"></Input>
                                        </div>
                                    </div>
                                </div>
                                <div><Button onClick={search}  className="bg-blue-500 text-white">search</Button></div>
                            </div>
                        }]}
                    />
                    <div>
                        <Table loading={LApplaoding} className="font-blinkmacsystem border" size={"small"} pagination={{ pageSize: 8 }} dataSource={LApplication} columns={columns} />
                    </div>
                </div>
        },
    ]
    return {
        items,
        LApplication,
        columns,
        showModal,
        isModalOpen,
        handleOk,
        handleCancel,
        DomainName,
        setTempDomainName,
        Uri,
        setTempUri,
        onChange,
        key
    }
}
export default Uselogic;


