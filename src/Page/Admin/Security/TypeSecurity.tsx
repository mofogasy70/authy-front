import { Card, Row, Table, Col, Button, Modal, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { VITE_URIAPI } from "../../../constant";

const TypeSecurity: React.FC = () => {
  const uri = VITE_URIAPI;
  const [LTypeSecurity, setLTypeSecurity] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');

  const setTempName = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }
  const setTempDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(event.target.value); }

  const showModal = () => { setIsModalOpen(true); };
  const handleOk = () => { createTypeSecurity(); window.location.reload(); setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };

  async function createTypeSecurity() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) { headers.append('x-auth-token', token); }
    const JSONdata = {
      Name: Name,
      Description: Description
    };
    const response = await fetch(uri + '/API/TypeSecurity', {
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

  async function deleteTypeSecurity(id: string) {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    if (token) { headers.append('x-auth-token', token); }
    const response = await fetch(uri + '/API/TypeSecurity/' + id, {
      method: 'delete',
      headers: headers
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
      headers.append('Content-Type', 'TypeSecurity/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/TypeSecurity/', {
          method: 'GET',
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          setLTypeSecurity(data);
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
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    { title: 'Description', dataIndex: 'Description', key: 'Description' },
    {
      render: () => (<Button type="primary">Edit</Button>),
    },
    {
      render: (TypeSecurity: any) => (<Popconfirm
        title="Delete the task"
        description="Are you sure to delete this Secutity?"
        okText="Yes"
        cancelText="No"
        onConfirm={()=>{ deleteTypeSecurity(TypeSecurity._id) }}
      >
        <Button danger>Delete</Button>
      </Popconfirm>),
    }
  ];
  return (
    <div>
      <br />
      <Row >
        <Col span={1}></Col>
        <Col span={22}>
          <Card title="List of the TypeSecurity:">
            <Table pagination={false} dataSource={LTypeSecurity} columns={columns} />
            <br />
            <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>
      <Modal title="Add new TypeSecurity:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <hr />
        <Row>
          <p>Name of TypeSecurity:</p>
          <Input placeholder="" value={Name} onChange={setTempName} />
        </Row>
        <Row>
          <p>Description for that TypeSecurity:</p>
          <Input.TextArea placeholder="" value={Description} onChange={setTempDescription} />
        </Row>
      </Modal>
    </div>
  );
}
export default TypeSecurity;


