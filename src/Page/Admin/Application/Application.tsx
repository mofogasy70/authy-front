import { Card, Row, Table, Col, Button, Modal, Input, Popconfirm, Breadcrumb, Tabs } from "antd";
import { useEffect, useState } from "react";
import { VITE_URIAPI } from "../../../constant";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import Uselogic from "../../../hooks/logics/admin/Application";

const Application: React.FC = () => {
  const { key,onChange,items, showModal, isModalOpen, handleOk, handleCancel, DomainName, setTempDomainName, Uri, setTempUri } = Uselogic()
  return (
    <div className="min-h-min">
      <div className="w-full h-10 flex items-center justify-start text-sm p-1">
        <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
          <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item className="md:text-lg">Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="p-1">
        <Card title="List of the Application:">
          <Tabs activeKey={key} items={items} onChange={onChange}></Tabs>
          <br />
          <div><Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button></div>
        </Card>
      </div>
      <Modal title="Add new Application:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <p>Domaine Name of Application:</p>
          <Input placeholder="" value={DomainName} onChange={setTempDomainName} />
        </div>
        <div>
          <p>URI of Application:</p>
          <Input placeholder="" value={Uri} onChange={setTempUri} />
        </div>
      </Modal>
      <div className="h-10"></div>
    </div>
  );
}
export default Application;


