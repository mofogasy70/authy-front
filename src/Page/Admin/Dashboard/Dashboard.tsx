import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import Uselogic from "../../../hooks/logics/admin/Dashboard";
import ReactApexChart from "react-apexcharts";

const Dashboard: React.FC = () => {
    const { chartData } = Uselogic();
    return (
        <div className="min-h-min">
            <div className="w-full h-10 flex items-center justify-start text-sm p-1">
                <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
                    <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg">Dashboard</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="h-1/4 md:h-36 w-full md:flex font-blinkmacsystem">
                <div className="h-1/4  md:h-full w-full flex items-center justify-center md:w-1/4 p-1">
                    <div className="rounded-lg  w-full h-full md:h-4/5 shadow-lg p-3  bg-blue-50">
                        <p className="text-sm md:text-base w-full">New clients</p>
                        <p className="text-sm md:text-xs text-gray-500 w-full">Total of new client this month</p>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-start w-1/2 text-3xl"><p>3</p></div>
                            <div className="flex items-center justify-start w-1/2"><Tag color="green">+18.7%</Tag></div>
                        </div>
                    </div>
                </div>
                <div className="h-1/4 md:h-full w-full flex items-center justify-center md:w-1/4 p-1">
                    <div className="rounded-lg  w-full h-full md:h-4/5 shadow-lg p-3  bg-blue-100">
                        <p className="text-sm md:text-base w-3/4">Application created</p>
                        <p className="text-sm md:text-xs text-gray-500 w-full">New Application benefits sign Authy</p>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-start w-1/2 text-3xl"><p>4</p></div>
                            <div className="flex items-center justify-start w-1/2"><Tag color="green">+18.7%</Tag></div>
                        </div>

                    </div>
                </div>
                <div className="h-1/4 md:h-full w-full flex items-center justify-center md:w-1/4 p-1">
                    <div className="rounded-lg  w-full h-full md:h-4/5 shadow-lg p-3  bg-blue-200">
                        <p className="text-sm md:text-base w-3/4">Interesting devellopper</p>
                        <p className="text-sm md:text-xs text-gray-500 w-full">Total devellopper registered and uses authy sign</p>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-start w-1/2 text-3xl"><p>12</p></div>
                            <div className="flex items-center justify-start w-1/2"><Tag color="green">+18.7%</Tag></div>
                        </div>
                    </div>
                </div>
                <div className="h-1/4 md:h-full w-full flex items-center justify-center md:w-1/4 p-1">
                    <div className="rounded-lg  w-full h-full md:h-4/5 shadow-lg p-3   bg-blue-300">
                        <p className="text-sm md:text-base w-3/4">This month's card spending</p>
                        <p className="text-sm md:text-xs text-gray-500 w-full">Total of gain thanks to paid features</p>
                        <div className="flex-grow"></div>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-start w-1/2 text-3xl"><p>155.5$</p></div>
                            <div className="flex items-center justify-start w-1/2"><Tag color="green">+18.7%</Tag></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="font-blinkmacsystem">
                <div className="min-h-min w-full space-y-1">
                    <div className="w-full min-h-min md:h-96  md:flex">
                        <div className="w-full min-h-min md:w-4/6 flex items-center justify-center p-1">
                            <div className="shadow-lg h-full w-full bg-white p-2 rounded-md">
                                <p className="text-base">Total View this Month</p>
                                <p className="text-xs text-gray-500">Dayly Users use Authy</p>
                                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={"80%"} />
                            </div>
                        </div>
                        <div className="w-full min-h-min md:w-2/6 flex items-center justify-center p-1">
                            <div className="shadow-lg h-full w-full bg-white p-1 rounded-md">
                            </div>
                        </div>
                    </div>
                    <div className="min-h-min w-full p-1 md:flex">
                        <div className=" h-full w-full p-1">
                            <div className="h-full w-full flex items-center justify-center bg-white rounded-md shadow-md p-2">
                                <div className="w-1/3 h-full">
                                    <p className="text-base">Visits by Device</p>
                                    <p className="text-xs text-gray-400">Summary of Visits by Device</p>
                                </div>
                                <div className="w-2/3 h-full flex items-center justify-center">
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">Desktop</p>
                                        <p className="flex items-center justify-center text-xl">40%</p>
                                    </div>
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">Mobile</p>
                                        <p className="flex items-center justify-center text-lg">50%</p>
                                    </div>
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">Tablet</p>
                                        <p className="flex items-center justify-center text-lg">10%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-full p-1">
                            <div className="h-full w-full flex items-center justify-center bg-white rounded-md shadow-md p-2">
                                <div className="w-1/3 h-full">
                                    <p className="text-base">Visits by OS</p>
                                    <p className="text-xs text-gray-400">Summary of Visits by OS</p>
                                </div>
                                <div className="w-2/3 h-full flex items-center justify-center">
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">Windows</p>
                                        <p className="flex items-center justify-center text-xl">40%</p>
                                    </div>
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">Android</p>
                                        <p className="flex items-center justify-center text-lg">40%</p>
                                    </div>
                                    <div className="w-1/3 h-full">
                                        <p className="flex items-center justify-center text-xs text-gray-500">IOS</p>
                                        <p className="flex items-center justify-center text-lg">20%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-min w-full p-1">
                        <div className="shadow-md h-full w-full bg-white rounded-md border p-2">
                            <div>
                                <p>Recent request of devellopper:</p>
                            </div>
                            <br />
                            <Table></Table>
                        </div>
                    </div>

                </div>
            </div>
            <div className="h-5"></div>
        </div>
    )
}
export default Dashboard;