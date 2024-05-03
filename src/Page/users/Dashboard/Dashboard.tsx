import { Breadcrumb, Checkbox, Select, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import { Option } from "antd/es/mentions";
import Uselogic from "../../../hooks/logics/user/Dashboard";
import ReactApexChart from "react-apexcharts";
interface IConLogData {
  _id: {
    UserApplication: string;
    Day: number;
    Month: number;
    Year: number;
  }
  count: number;
}
interface Iseries {
  name: string;
  data: number[]
}
const Dashboard: React.FC = () => {
  const {
    setMonth,
    month,
    setYear,
    Year,
    YearOptionData,
    TabApplication,
    Application,
    setApplication,
    state,
    LActivity,
    columnsAct,
  } = Uselogic();

  return (
    <div className="min-h-screen space-y-2 mb-2 font-blinkmacsystem">
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
      <div className="md:flex min-h-min w-full">
        <div className="md:w-4/6 w-full min-h-min p-1">
          <div className="shadow-md min-h-min w-full bg-white rounded-lg p-2 border">
            <p className="text-xl font-semibold h-11">Log Chart</p>
            <div className="md:flex items-center justify-center md:space-x-2 md:text-base text-sm md:h-20">
              <div className="w-full md:w-1/3">
                <p>month:</p>
                <Select onChange={setMonth} style={{ width: "100%" }} defaultValue={month}>
                  <Option key="01" value="01">january</Option>
                  <Option key="02" value="02">february</Option>
                  <Option key="03" value="03">march</Option>
                  <Option key="04" value="04">april</Option>
                  <Option key="05" value="05">may</Option>
                  <Option key="06" value="06">june</Option>
                  <Option key="07" value="07">july</Option>
                  <Option key="08" value="08">august</Option>
                  <Option key="09" value="09">september</Option>
                  <Option key="10" value="10">october</Option>
                  <Option key="11" value="11">november</Option>
                  <Option key="12" value="12">december</Option>
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <p>Year:</p>
                <Select onChange={setYear} defaultValue={Year} style={{ width: "100%" }}
                  options={YearOptionData}
                >
                </Select>
              </div>
              <div className="w-full md:w-1/3">
                <p>chart:</p>
                <Select style={{ width: "100%" }}
                  options={TabApplication.map((role) => ({
                    value: role.Application._id,
                    label: <Checkbox onChange={(event) => {
                      if (event.target.checked) {
                        let nouveauTableau = Application.concat([role.Application._id])
                        setApplication(nouveauTableau);
                      } else {
                        let nouveauTableau = Application.filter(element => element !== role.Application._id);
                        setApplication(nouveauTableau);
                      }
                    }}>{role.Application.DomainName}</Checkbox>,
                  }))} >
                  <option value="" key="">
                    <Checkbox checked disabled>
                      Authy
                    </Checkbox>
                  </option>
                </Select>
              </div>
            </div>
            <div className="h-full md:h-96 p-2 rounded-lg">
              <ReactApexChart
                height={"100%"}
                options={state.options}
                series={state.series}
                type="line"
                width={"100%"}
              />
            </div>
          </div>
        </div>
        <div className="min-h-min w-full md:w-2/6 p-1">
          <div title="Recent activity:" className="shadow-md h-full w-full bg-white rounded-lg p-2 md:p-5 border">
            <p className="text-xl font-semibold">Recent Activity</p>
            <div className="">
              <Table pagination={{ pageSize: 4 }} dataSource={LActivity} className="md:mt-4" columns={columnsAct}></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
