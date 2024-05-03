import React from "react";
import { Breadcrumb, Button, Card, Col, Input, Modal, Select, Table, Tabs } from "antd";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Uselogic from "../../../hooks/logics/admin/Users";
import { Link } from "react-router-dom";
const Users: React.FC = () => {
    const {
        LUser, columns, showModal, isModalOpen, handleOk, handleCancel, Name, setTempName, LastName, setTempLastName,
        DateBirth, setTempDateBirth, PhoneNumber, setTempPhoneNumber, Mail, setTempMail, setRole, Lroles, Address, setTempAddress,
        Password, setTempPassword, ConfPassword, setTempConfPassword, isModalOpendelte, handleOkdelete, handleCanceldelete, key, items,onChange
    } = Uselogic();
    return (
        <div>
            <div className="w-full h-10 flex items-center justify-start text-sm p-1">
                <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
                    <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item className="md:text-lg">Users</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Card title="Liste of all Users:">
                    <Tabs defaultActiveKey={key} items={items} onChange={onChange}>
                    </Tabs>
                </Card>
            </div>
            <Modal title="Add new User:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <hr />
                <div>
                    <Col span={11}>
                        <div>
                            <p>Name:</p>
                            <Input placeholder="Name" value={Name} onChange={setTempName} />
                        </div>
                        <div>
                            <p>Last Name:</p>
                            <Input placeholder="LastName" value={LastName} onChange={setTempLastName} />
                        </div>
                        <div>
                            <p>Date of Birth:</p>
                            <Input type='Date' placeholder="DateBirth" value={DateBirth} onChange={setTempDateBirth} />
                        </div>
                        <div>
                            <p>Phone Number:</p>
                            <Input placeholder="PhoneNumber" value={PhoneNumber} onChange={setTempPhoneNumber} />
                        </div>
                        <div>
                            <p>Mail address:</p>
                            <Input placeholder="default size" prefix={<UserOutlined />} value={Mail} onChange={setTempMail} />
                        </div>
                    </Col>
                    <Col span={11}>
                        <p>her Role ?:</p>
                        <div>
                            <Select
                                style={{ width: 120 }}
                                onChange={setRole}
                                options={Lroles.map((role) => ({
                                    value: role._id,
                                    label: role.Name,
                                }))}
                            />
                        </div>
                        <div>
                            <p>Address/location:</p>
                            <Input placeholder="Address" value={Address} onChange={setTempAddress} />
                        </div>
                        <div>
                            <p>the Password:</p>
                            <Input.Password placeholder="mots de passe" value={Password} onChange={setTempPassword} />
                        </div>
                        <div>
                            <p>confirm the Password:</p>
                            <Input.Password placeholder="Confirmer le mots de passe:" value={ConfPassword} onChange={setTempConfPassword} />
                        </div>
                    </Col>
                </div>
            </Modal>
            <Modal title="supprimer un Role" open={isModalOpendelte} onOk={handleOkdelete} onCancel={handleCanceldelete}>
                <p>Voulez vous vraiment supprimer cet element?</p>
            </Modal>
        </div>);
}
export default Users;
