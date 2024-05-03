import { Breadcrumb, Button, Card, Checkbox, Col, Input, List, Popconfirm, Row, Select, Switch, Table, Tabs, TabsProps, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import { HomeOutlined, RightOutlined, BarsOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";

import { VITE_URIAPI } from "../../../constant";
import Uselogic from "../../../hooks/logics/user/AccountApplication";
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
  MaxAttemps: number;
  MaxRetries: number;
  ValidityTime: number;
  Status: boolean;
  UserApplication: string;
  Security: any;
}
const AccountApplication: React.FC = () => {
  const {
    App,
    items,
    onChange,
    itemsdevice,
    onChangedevice,
    LITypeSecuritysWithChild,
    setInfo,
    setInfostatus
  } = Uselogic();
  return (
    <div className="min-h-min space-y-2 mb-2 font-blinkmacsystem" >
      <div className="w-full h-10 flex items-center justify-start text-sm p-1">
        <Breadcrumb>
          <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Application</Breadcrumb.Item>
          <Breadcrumb.Item className="md:text-lg">{App?.DomainName}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-2">
        <Card title={"Connexion Log for " + App?.DomainName + ":"}>
          <Tabs defaultActiveKey="Graphe" items={items} onChange={onChange} />
        </Card>
      </div>
      <div>
        <Card title={"device used on " + App?.DomainName + " :"} >
          <Tabs defaultActiveKey="Active" items={itemsdevice} onChange={onChangedevice} />
        </Card>
      </div>

      <div>
        <Card title={"All securuty for " + App?.DomainName + " :"}>
          <br />
          {LITypeSecuritysWithChild?.map((TypeSecuritysWithChild: ITypeSecuritysWithChild) => (
            <>
              <h3>{TypeSecuritysWithChild.TypeSecurity?.Name}</h3>
              <p>{TypeSecuritysWithChild.TypeSecurity?.Description}</p>
              <br />
              <br />
              {TypeSecuritysWithChild.UserAppSecurity?.map((UserAppSecurity: IUserAppSecurity) => (
                <>
                  <Row>
                    <Col span={19}>{UserAppSecurity.Security.Name}</Col>
                    <Col span={3}><Switch checked={UserAppSecurity.Status} /></Col>
                    <Col span={2}><Button onClick={() => {
                      setInfo(
                        <Card title={UserAppSecurity.Security.Name}>
                          <Row>
                            <p>Maximum number attemps: </p>
                            <Input name="Maxattemp" disabled value={UserAppSecurity.MaxAttemps}></Input>
                          </Row>
                          <Row>
                            <p>Maximum number Retries: </p>
                            <Input name="MaxRetries" disabled value={UserAppSecurity.MaxRetries}></Input>
                          </Row>
                          <Row>
                            <p>Validity time:</p>
                            <Input name="MaxRetries" disabled suffix="minute" value={UserAppSecurity.ValidityTime}></Input>
                          </Row>
                          <br />
                          <br />
                          <Row>
                            <Col span={1}></Col>
                            <Col span={11}><Button style={{ width: "100%" }} type="dashed">cancel</Button></Col>
                            <Col span={11}><Button style={{ width: "100%" }} type="primary">commit</Button></Col>
                            <Col span={1}></Col>
                          </Row>
                        </Card>
                      );
                      setInfostatus(true);
                      //}
                    }} style={{ border: "none" }} icon={<RightOutlined />} ></Button></Col>
                  </Row>
                  <br />
                </>
              ))}
            </>
          ))}
        </Card>
      </div>
    </div>
  );
}
export default AccountApplication;
