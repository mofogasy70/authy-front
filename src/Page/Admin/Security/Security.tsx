import { Card, Row, Table, Col, Button, Modal, Input, Select, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { VITE_URIAPI } from "../../../constant";

const Security: React.FC = () => {
  const uri = VITE_URIAPI;
  const [LSecurity, setLSecurity] = useState<any[]>([]);
  const [LTypeSecurity, setLTypeSecurity] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Name, setName] = useState('');
  const [TypeSecurity, setTypeSecurity] = useState('');

  const setTempName = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); }

  const showModal = () => { setIsModalOpen(true); };
  const handleOk = () => { createSecurity(); window.location.reload(); setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };

  async function createSecurity() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) { headers.append('x-auth-token', token); }
    const JSONdata = {
      Name: Name,
      TypeSecurity: TypeSecurity
    };
    const response = await fetch(uri + '/API/Security', {
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

  async function deleteSecurity(id: string) {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    if (token) { headers.append('x-auth-token', token); }
    const response = await fetch(uri + '/API/Security/' + id, {
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
    const fetchSecurity = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'Security/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/Security/', {
          method: 'GET',
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          setLSecurity(data);
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };

    const fetchTypeSecurity = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'Security/json');
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

    fetchTypeSecurity();
    fetchSecurity();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'Name', key: 'Name' },
    { title: 'Security type', render: (TypeSecurity: any) => (<div>{TypeSecurity.TypeSecurity.Name}</div>) },
    {
      render: () => (<Button type="primary">Edit</Button>),
    },
    {
      render: (Security: any) => (<Popconfirm
        title="Delete the task"
        description="Are you sure to delete this Secutity?"
        okText="Yes"
        cancelText="No"
        onConfirm={()=>{ deleteSecurity(Security._id) }}
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
          <Card title="List of the Security:">
            <Table pagination={false} dataSource={LSecurity} columns={columns} />
            <br />
            <Button onClick={showModal} style={{ backgroundColor: 'green', color: 'white' }} >Add</Button>
          </Card>
        </Col>
        <Col span={1}></Col>
      </Row>
      <Modal title="Add new Security:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <hr />
        <Row>
          <p>Name of Security:</p>
          <Input placeholder="" value={Name} onChange={setTempName} />
        </Row>
        <p>her Role ?:</p>
        <Row>
          <Select
            style={{ width: 120 }}
            onChange={setTypeSecurity}
            options={LTypeSecurity.map((TypeSecurity) => ({
              value: TypeSecurity._id,
              label: TypeSecurity.Name,
            }))}
          />
        </Row>
      </Modal>
    </div>
  );
}
export default Security;


