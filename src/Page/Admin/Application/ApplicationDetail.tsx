import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, Collapse, Input, Popconfirm, Tabs, Tag } from "antd";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import Uselogic from "../../../hooks/logics/admin/ApplicationDetail";
import ApplicationService from "../../../service/Application/ApplicationService";

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
        Platform
    } = Uselogic();
    return (
        <div className="min-h-min space-y-3">
            <div className="w-full h-10 flex items-center justify-start text-sm p-1">
                <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
                    <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg">Application</Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg">{DomainName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Collapse className="bg-white shadow-lg"
                items={[{
                    key: '1',
                    label:
                        <div className="flex">
                            <div className="w-1/2 text-lg">Information about {DomainName}</div>
                            <div className="w-1/2 flex items-center justify-end font-blinkmacsystem">status:{ApplicationService.toTag(status)}</div>
                        </div>,
                    children:
                        <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem md:flex space-x-2">
                            <div className="w-full md:w-6/12 space-y-2">
                                <div className="font-semibold">Genereal information :</div>
                                <br />
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>Logo:</div></div>
                                    <div className="flex-grow flex items-center justify-center"><Avatar size={100} src={Logo} /></div>
                                    <div className="w-full md:w-2/12 flex items-center justify-start"><Popconfirm title="" okText="Yes"
                                        cancelText="No"><Button className="bg-blue-500 text-white font-blinkmacsystem">change Logo</Button></Popconfirm></div>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>Domaine Name:</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={DomainName}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>URI:</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={Uri}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>Redirection Url:</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={UriRedirection}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>date of creation:</div></div>
                                    <Input type="Date" className="flex-grow flex items-center justify-center" value={createdAt}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>published by:</div></div>
                                    <div className="flex-grow flex items-center justify-center">{User}</div>
                                </div>
                                <br />
                            </div>
                            <div className="w-full md:w-6/12 space-y-2">
                                <div className="w-full md:flex space-y-2 md:mt-40">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>App-Key :</div></div>
                                    <Input.Password className="flex-grow flex items-center justify-center" value={AppKey}></Input.Password>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>App-Id :</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={AppId}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>Categorie :</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={Categorie}></Input>
                                </div>
                                <div className="w-full md:flex space-y-2">
                                    <div className="w-full md:w-3/12 md:flex md:items-center md:justify-center"><div>Platform :</div></div>
                                    <Input className="flex-grow flex items-center justify-center" value={Platform}></Input>
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
                            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={"80%"} />
                        </div>
                    </div>
                    <div className="w-full min-h-min md:w-2/6 flex items-center justify-center p-1">
                        <div className="h-full w-full p-1 rounded-md">
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-md min-h-min p-2">
                <div className="h-full w-full p-2 rounded-md">
                    <p className="text-lg">All setting</p>
                    <p className="text-xs text-gray-500">all setting you set on ... </p>
                </div>
            </div>
            <div className="h-10"></div>
        </div>
    )
}
export default ApplicationDetail;
