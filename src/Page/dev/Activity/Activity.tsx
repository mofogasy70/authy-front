import { Breadcrumb, Card, Input, Select, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import UseLogic from "../../../hooks/logics/user/Activity";
const Activity: React.FC = () => {
  const {columns ,LActivity} =UseLogic();
  return (
    <div className="h-screen space-y-2">
      <div>
        <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
          <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item className="md:text-lg">Activity</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg shadow-lg flex items-center justify-center font-blinkmacsystem">
        <Card title="Activity" className="p-3 w-full font-blinkmacsystem">
          <p className=" md:text-lg">Filter:</p>
          <div className="md:flex min-h-min md:h-20 items-center justify-center w-full md:w-1/2">
            <div className="w-full md:w-1/3 h-full p-1"><p>Date</p><Input type="Date"></Input></div>
            <div className="w-full md:w-1/3 h-full p-1"><p>Application</p><Select className="w-full" title="Application">
            </Select></div>
            <div className="w-full md:w-1/3 h-full p-1"><p>State</p><Select className="w-full font-blinkmacsystem" title="State" defaultActiveFirstOption={true} defaultValue={1}>
              <option value={1}><Tag color="cyan" defaultChecked>all</Tag></option>
              <option value={2}><Tag color="green">passif</Tag></option>
              <option value={3}><Tag color="yellow">middle</Tag></option>
              <option value={4}><Tag color="red">important</Tag></option>
            </Select></div>
          </div>
          <p className=" md:text-lg">Activity Table:</p>
          <div className="mt-2"><Table pagination={{ pageSize: 5 }} dataSource={LActivity} className="w-full rounded-lg font-blinkmacsystem" columns={columns}></Table></div>
        </Card>
      </div>
    </div>
  );
}
export default Activity;
