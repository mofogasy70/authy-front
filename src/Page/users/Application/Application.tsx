import { Breadcrumb, Button, Card, List } from "antd";
import { DeleteTwoTone, HomeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import UseLogic from "../../../hooks/logics/user/Application";
import { VITE_URIAPI } from "../../../constant";
import devService from "../../../service/dev/devService";
const Application: React.FC = () => {
  const {
    LAccount
  } = UseLogic()
  return (
    <div className="min-h-screen space-y-2 mb-2 p-2 sm:p-0">
      <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
        <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
        <Breadcrumb.Item className="md:text-lg">Account</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="Manage your different Account:">
        <List
          className="min-h-min w-full"
          renderItem={(item) => (
            <div className="min-h-min w-full p-1 flex items-center justify-start rounded-sm mb-1 space-x-1 bg-slate-50 shadow-sm">
              <img className="h-8 sm:h-11 min-w-min" src={VITE_URIAPI + item.Application.Logo} />
              <div className="h-full w-2/4 sm:w-1/4 flex justify-center items-center"><Link to={"/Acceuil/Application/"+item.Application._id}>{item.Application.DomainName}</Link></div>
              <div className="h-full w-1/4 justify-center items-center hidden sm:flex"><Link className="text-blue-500 underline" to={item.Application.Uri}>{item.Application.Uri}</Link></div>
              <div className="h-full w-1/4 hidden sm:flex justify-center items-center">{devService.toChek(item.Application.status)}</div>
              <div className="h-full  flex-grow  justify-center items-center"><Button icon={<DeleteTwoTone twoToneColor="#eb2f96" />}> Delete</Button></div>
            </div>
          )}
          pagination={false}
          dataSource={LAccount} />
      </Card>
    </div>
  );
}
export default Application;
