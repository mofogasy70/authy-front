import { DeleteTwoTone, HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Collapse, Input, List, Modal, Popconfirm, Switch } from "antd";
import ReactApexChart from "react-apexcharts";
import { Link, redirect } from "react-router-dom";
import Uselogic from "../../../hooks/logics/dev/ApplicationDetail";
import { useState } from "react";
import devService from "../../../service/dev/devService";


const ApplicationDetail: React.FC = () => {
    const {
        DomainName,
        AppId,
        User,
        Uri,
        UriRedirection,
        Logo,
        createdAt,
        status,
        AppKey,
        chartData,
        Categorie,
        Platform,
        chartSeries,
        chartOptions,
        securitystatus,
        Origins,
        value,
        value_d,
        setTempvalue_d,
        setvalue_d,
        setTempvalue,
        createOrigins,
        deleteOrigins,
        createRedirect,
        Redirect,
        deleteRedirect
    } = Uselogic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    return (
        <div className="min-h-min space-y-3 p-2 sm:p-0">
            <div className="w-full h-10 flex items-center justify-start text-sm p-1">
                <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
                    <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg"><Link to={"/Acceuil/Application"}>Application</Link></Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg">{DomainName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Collapse className="bg-white shadow-lg"
                items={[{
                    key: '1',
                    label:
                        <div className="flex">
                            <div className="w-1/2 text-lg">Information about {DomainName}</div>
                            <div className="w-1/2 flex items-center justify-end font-blinkmacsystem"></div>
                        </div>,
                    children:
                        <div className="min-h-min mb-2 font-blinkmacsystem">
                            <div className="w-full  space-y-2">
                                <div className="font-semibold">Genereal information :</div>
                                <br />
                                <div className="w-full flex">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Logo:</div></div>
                                    <div className="w-10/12 flex items-center justify-center"><Avatar size={100} src={Logo} /></div>
                                    <div className="w-full md:w-2/12 flex items-center justify-start"><Popconfirm title="" okText="Yes"
                                        cancelText="No"><Button className="bg-blue-500 text-white font-blinkmacsystem">change Logo</Button></Popconfirm></div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Domaine Name:</div></div>
                                    <div className="w-10/12 flex items-center justify-center" >{DomainName}</div>
                                </div>
                                <div className="w-full flex min-h-min">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Allowed Redirect URI:</div></div>
                                    <div className="w-10/12 flex items-center justify-center">
                                        <div>
                                            <List
                                                className="p-1 bg-gray-100 rounded-sm"
                                                renderItem={(item) => (
                                                    <List.Item className="w-full h-full flex items-center justify-center space-x-1 border border-b bg-white p-1">
                                                        <div>{item.value}</div>
                                                        <div>
                                                            <Popconfirm
                                                                onCancel={close}
                                                                onConfirm={() => { deleteRedirect(item._id) }}
                                                                title='Are you sure ,you want delete this Redirection URI?'
                                                                className="bg-white">
                                                                <Button icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
                                                            </Popconfirm>
                                                        </div>
                                                    </List.Item>)}
                                                dataSource={Redirect}>
                                                <Button className="bg-green-500 rounded-sm h-11 text-white mt-1" onClick={showModal2}>Add new URI</Button>
                                            </List>

                                            <Modal title="Add new Allowed Redirection URI:" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null}>
                                                <div className="min-h-min space-y-2">
                                                    <div><Input placeholder="http://" value={value_d} onChange={setTempvalue_d} className="rounded-sm h-11"></Input></div>
                                                    <Button onClick={createRedirect} className="bg-blue-500 rounded-sm h-11 text-white">add</Button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>date of creation:</div></div>
                                    <div className="w-10/12 flex items-center justify-center">{createdAt}</div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Categorie :</div></div>
                                    <div className="w-10/12 flex items-center justify-center">{Categorie}</div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Platform :</div></div>
                                    <div className="w-10/12 flex items-center justify-center" >{Platform}</div>
                                </div>
                                <br />
                                <div className="font-semibold">Advenced information :</div>
                                <br />
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>App-Id :</div></div>
                                    <div className="w-10/12 flex items-center justify-center">{AppId}</div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>App-Key :</div></div>
                                    <div className="w-10/12 flex items-center justify-center">{AppKey}</div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Redirection Url:</div></div>
                                    <div className="w-10/12 flex items-center justify-center"><a className="text-blue-500 underline" href={UriRedirection}>{UriRedirection}</a></div>
                                </div>
                                <div className="w-full flex min-h-min">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>Allowed JavaScript origins:</div></div>
                                    <div className="w-10/12 flex items-center justify-center">
                                        <div>
                                            <List
                                                className="p-1 bg-gray-100 rounded-sm"
                                                renderItem={(item) => (
                                                    <List.Item className="w-full h-full flex items-center justify-center space-x-1 border border-b bg-white p-1">
                                                        <div>{item.value}</div>
                                                        <div>
                                                            <Popconfirm
                                                                onCancel={close}
                                                                onConfirm={() => { deleteOrigins(item._id) }}
                                                                title='Are you sure ,you want delete this JavaScript origins ?'
                                                                className="bg-white">
                                                                <Button icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
                                                            </Popconfirm>
                                                        </div>
                                                    </List.Item>)}
                                                dataSource={Origins}>
                                                <Button className="bg-green-500 rounded-sm h-11 text-white mt-1" onClick={showModal}>Add new URI</Button>
                                            </List>
                                            <Modal title="Add new Allowed JavaScript origins:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                                <div className="min-h-min space-y-2">
                                                    <div><Input placeholder="http://" value={value} onChange={setTempvalue} className="rounded-sm h-11"></Input></div>
                                                    <Button onClick={createOrigins} className="bg-blue-500 rounded-sm h-11 text-white">add</Button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex h-11">
                                    <div className="w-2/12 md:flex md:items-center md:justify-end"><div>API status:</div></div>
                                    <div className="w-10/12 flex items-center justify-center">{devService.toChek(status)}</div>
                                </div>
                            </div>
                        </div>
                }]}
            />
            <div className="bg-white shadow-lg rounded-md min-h-min p-2">
                <div className="w-full min-h-min md:h-96  md:flex">
                    <div className="w-full min-h-min md:w-4/6 flex items-center justify-center p-1">
                        <div className="h-full w-full p-2 rounded-md">
                            <p className="text-base">Total View this Month</p>
                            <p className="text-xs text-gray-500">Dayly Users use Authy</p>
                            <ReactApexChart
                                options={chartData.options}
                                series={chartData.series}
                                type="area" height={"80%"} />
                        </div>
                    </div>
                    <div className="w-full min-h-min md:w-2/6 flex items-center justify-center p-1">
                        <div className="h-full w-full rounded-md">
                            <p className="text-base">Total View Using Advenced security</p>
                            <p className="text-xs text-gray-500">last three month</p>
                            <ReactApexChart
                                options={chartOptions}
                                series={chartSeries}
                                type="donut"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-md min-h-min p-2 space-y-2">
                <div className="h-full w-full p-2 rounded-md">
                    <p className="text-lg">All setting</p>
                    <p className="text-xs text-gray-500">all setting you set on ... </p>
                </div>
                <div className="w-1/3 h-11 flex justify-center items-center p-2">
                    <div className="min-w-min md:flex md:items-center md:justify-end text-lg"><div>2 Factor security :</div></div>
                    <div className="flex-grow"></div>
                    <div className="min-w-min flex items-center justify-center space-x-2">
                        <Switch checked={securitystatus}></Switch> <Button icon={<RightOutlined />}></Button>
                    </div>
                    <div className="min-w-min flex items-center justify-center"></div>
                </div>
            </div>
            <div className="h-10"></div>
        </div>
    )
}
export default ApplicationDetail;
