import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Modal, Row, Table } from "antd";
import { VITE_URIAPI } from "../../../constant";
const Roles: React.FC = () => {
    const uri = VITE_URIAPI;
    const [Lroles, setLroles] = useState<any[]>([]);
    const [Lisroles, setIsLroles] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleid, setRoleid] = useState("");
    const [isModalOpendelte, setIsModalOpendelete] = useState(false);
    const [Name, setName] = useState('');
    const [Value, setValue] = useState('');

    const showModal = () => { setIsModalOpen(true); };
    const showModaldelete = (id: string) => { setRoleid(id); setIsModalOpendelete(true); };
    const handleOk = () => { createRoles(); window.location.reload(); setIsModalOpen(false); };
    const handleOkdelete = () => { deleteRoles(roleid); window.location.reload(); setIsModalOpen(false); };
    const handleCancel = () => { setIsModalOpen(false); };
    const handleCanceldelete = () => { setIsModalOpendelete(false); };
    const setTempName = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
    const setTempValue = (event: React.ChangeEvent<HTMLInputElement>) => { setValue(event.target.value); }

    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) { headers.append('x-auth-token', token); }

    async function createRoles() {
        const JSONdata = {
            Name: Name,
            Value: Value
        };
        const response = await fetch(uri + '/API/Roles', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
            const data = await response.json();
            alert(data);
        } else {
            const data = await response.json();
            alert(data);
        }
    }
    async function deleteRoles(id: string) {
        const JSONdata = {
            Name: Name
        };
        const response = await fetch(uri + '/API/Roles/' + id, {
            method: 'delete',
            headers: headers,
            body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
            const data = await response.json();
            alert(data);
        } else {
            const data = await response.json();
            alert(data);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchRole = async () => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (token) { headers.append('x-auth-token', token); }
            try {
                const response = await fetch(uri + '/API/Roles/', {
                    method: 'GET',
                    headers: headers,
                });
                if (response.ok) {
                    const data = await response.json();
                    setLroles(data);
                    setIsLroles(false);
                } else {
                    throw new Error('Failed to fetch roles');
                }
            } catch (error) {
                alert(error);
            }
        };
        fetchRole();
    }, []);
    const columns = [
        { title: 'Name', dataIndex: 'Name', key: 'Names', },
        {
            render: () => (<Button >Edit</Button>),
        },
        {
            render: (Role: any) => (<Button className="bg-red-500 text-white" onClick={() => { showModaldelete(Role._id); }}>delete</Button>),
        }
    ];
    const dataSource = Lroles;
    return (
        <div className="min-h-min">
            <div>
                <Card>
                    <p>List of all Roles:</p>
                    <Table loading={Lisroles} pagination={false} dataSource={dataSource} columns={columns} />
                    <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
                </Card>
            </div>
            <Modal title="Add new Role" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Name of the new role:</p>
                    <Input placeholder="Name" value={Name} onChange={setTempName} />
                    <p>Value:</p>
                    <Input placeholder="Value" value={Value} onChange={setTempValue} />
                </div>
            </Modal>
            <Modal title="supprimer un Role" open={isModalOpendelte} onOk={handleOkdelete} onCancel={handleCanceldelete}>
                <p>Voulez vous vraiment supprimer cet element?</p>
            </Modal>
        </div>);
}
export default Roles;