import { Breadcrumb, Button, Card, Input, Switch } from "antd";
import { RightOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Uselogic from "../../../hooks/logics/user/AccountSecurity";
interface ITypeSecurity {
  _id: string;
  Name: string;
  Description: string;
}
interface ITypeSecuritysWithChild {
  TypeSecurity?: ITypeSecurity;
  UserAppSecurity?: IUserAppSecurity[];
}
interface IUserAppSecurity {
  _id: string
  MaxAttemps: number;
  MaxRetries: number;
  ValidityTime: number;
  Status: boolean;
  UserApplication: string;
  Security: any;
}
const AccountSecurity: React.FC = () => {
  const {
    contextHolder,
    LITypeSecuritysWithChild,
    chageStatus,
    setInfo
  } = Uselogic();

  return (
    <div className="min-h-screen space-y-2 mb-2 p-2 sm:p-0">
      {contextHolder}
      <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
        <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
        <Breadcrumb.Item className="md:text-base">My Account</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="Menage your Account security" className="font-blinkmacsystem">
        {LITypeSecuritysWithChild?.map((TypeSecuritysWithChild: ITypeSecuritysWithChild) => (
          <>
            <h3 className="text-lg">{TypeSecuritysWithChild.TypeSecurity?.Name}:</h3>
            <p>{TypeSecuritysWithChild.TypeSecurity?.Description}</p>
            {TypeSecuritysWithChild.UserAppSecurity?.map((UserAppSecurity: IUserAppSecurity) => (
              <>
                <div className="flex space-y-2 mt-2  bg-slate-100 p-1 rounded-sm">
                  <div className="min-w-min h-14 flex items-center justify-center text-sm">{UserAppSecurity.Security.Name}</div>
                  <div className="flex-grow"></div>
                  <div className="min-w-min h-14 flex items-center justify-center"><Switch checked={UserAppSecurity.Status} onChange={() => {
                    chageStatus(UserAppSecurity._id, !UserAppSecurity.Status);
                    window.location.reload();
                  }} /></div>
                  <div className="min-w-min h-14 flex items-center justify-center"><Button onClick={() => {
                    setInfo(
                      <Card title={UserAppSecurity.Security.Name}>
                        <div>
                          <p>Maximum number attemps: </p>
                          <Input name="Maxattemp" disabled value={UserAppSecurity.MaxAttemps}></Input>
                        </div>
                        <div>
                          <p>Maximum number Retries: </p>
                          <Input name="MaxRetries" disabled value={UserAppSecurity.MaxRetries}></Input>
                        </div>
                        <div>
                          <p>Validity time:</p>
                          <Input name="MaxRetries" disabled suffix="minute" value={UserAppSecurity.ValidityTime}></Input>
                        </div>
                        <div>
                          <div ></div>
                          <div><Button style={{ width: "100%" }} type="dashed">cancel</Button></div>
                          <div><Button style={{ width: "100%" }} type="primary">commit</Button></div>
                          <div ></div>
                        </div>
                      </Card>
                    )
                  }} style={{ border: "none" }} icon={<RightOutlined />} ></Button></div>
                </div>
              </>
            ))}
          </>
        ))}
      </Card>
    </div>
  );
}
export default AccountSecurity;
