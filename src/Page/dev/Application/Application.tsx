import { Breadcrumb, Button, Input, List, Modal, Popover, Segmented, Select, Steps, Tag, Tooltip, message, theme } from "antd";
import { AppstoreOutlined, BarsOutlined, DeleteTwoTone, EditTwoTone, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApplicationService from "../../../service/Application/ApplicationService";
import devService from "../../../service/dev/devService";
import CategorieAPI from "../../../API/Categorie";
import ApllicationAPI from "../../../API/Application";
import PlatformAPI from "../../../API/Platform";
import { DefaultOptionType } from "antd/es/select";
import { VITE_URIAPI } from "../../../constant";

const Application: React.FC = () => {
  const [LApplication, setLApplication] = useState<any[]>([]);
  const [LAppL, setLAppl] = useState<boolean>(false);
  const [LC, setLC] = useState<any[]>([]);
  const [LP, setLP] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [DomainName, setDomainName] = useState('');
  const [Uri, setUri] = useState('');
  const [Categorie, setCategorie] = useState('');
  const [Platform, setPlatform] = useState('');
  const [UriRedirection, setUriRedirection] = useState('');
  const [s_name, sets_name] = useState('');
  const [s_status, sets_status] = useState('');
  const [s_order, sets_order] = useState('');

  const setTempDomainName = (event: React.ChangeEvent<HTMLInputElement>) => { setDomainName(event.target.value); }
  const setTempUri = (event: React.ChangeEvent<HTMLInputElement>) => { setUri(event.target.value); }
  const setTemps_name = (event: React.ChangeEvent<HTMLInputElement>) => { sets_name(event.target.value); }
  const setTemps_status = (event: React.ChangeEvent<HTMLInputElement>) => { sets_status(event.target.value); }
  const setTempUriRedirection = (event: React.ChangeEvent<HTMLInputElement>) => { setUriRedirection(event.target.value); }
  const setTemps_order = (event: React.ChangeEvent<HTMLInputElement>) => { sets_order(event.target.value); }


  const [file, setSelectedImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchLC = async () => {
    const temp: [] = await CategorieAPI.getall();
    const tab: DefaultOptionType[] | undefined = [];
    console.log(temp);
    await temp.map((cat: any) => { tab.push({ label: cat.Name, value: cat._id }) })
    setLC(tab);
  }
  const search = async()=>{
    setLAppl(true);
    setLApplication(await ApplicationService.search({NameId:s_name,sort:s_order}));
    setLAppl(false);
  }
  const fetchLP = async () => {
    const temp: [] = await PlatformAPI.getall();
    const tab: DefaultOptionType[] | undefined = [];
    temp.map((cat: any) => { tab.push({ label: cat.Name, value: cat._id }) })
    setLP(tab);
  }
  const createAppdev = async () => {
    try {
      await ApplicationService.createAppdev(DomainName, Uri, file, Categorie, Platform, UriRedirection);
      message.success("process complete!");
    } catch (error) {
      throw message.error(error+"");
    }

  }
  useEffect(() => {
    search();
    fetchLC();
    fetchLP();
  }, [s_name,s_order]);

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'General',
      content: <div className="w-full min-h-min space-y-2 mt-5 font-blinkmacsystem">
        <div>Name of Application</div>
        <Input className="rounded-sm h-11" value={DomainName} onChange={setTempDomainName} placeholder="Name of your application" required></Input>
        <div>Url <Tooltip placement="rightBottom" title="Write in this input you website or link for more information about this app.">
          <Tag color="red"> ?</Tag>
        </Tooltip>
        </div>
        <Input value={Uri} onChange={setTempUri} className="rounded-sm h-11" placeholder="Url"></Input>
        <div>Categorie</div>
        <Select defaultActiveFirstOption options={LC} className="rounded-sm h-11 w-full font-blinkmacsystem" onChange={setCategorie}></Select>
        <div>Application Logo</div>
        <div className="min-h-min items-center space-y-1 flex">
          {previewImage && <img className="h-20 rounded-full flex items-center justify-center" src={previewImage} alt="Aperçu" />}
          <div className="min-h-min">
            <input className="w-full h-11 p-2 " type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
      </div>,
    },
    {
      title: 'Advenced',
      content: <div className="w-full min-h-min space-y-2 mt-5 font-blinkmacsystem">
        <div>Platform</div>
        <Select defaultActiveFirstOption options={LP} className="rounded-sm h-11 w-full font-blinkmacsystem" onChange={setPlatform}>
        </Select>
        <div>REDIRECT URI <Tooltip placement="rightBottom" title="it is necessary if you use some page to recuperate the accesToken(PHP).">
          <Tag color="red"> ?</Tag>
        </Tooltip>
        </div>
        <Input value={UriRedirection} onChange={setTempUriRedirection} className="rounded-sm h-11" required></Input>
      </div>,
    },
    {
      title: 'Last',
      content: <div className="w-full min-h-min space-y-2 mt-5 font-blinkmacsystem">
        <div> after creating this application, you must read and complete the information about it:</div>
        <div className="bg-slate-50 p-1 rounded-sm">Application/{DomainName}/</div>
        <div>for more documentation on the method of use follow these links:</div>
        <div className="bg-slate-50 p-1 rounded-sm">
          <ul className="space-y-1">
            <li>PHP: <a className="text-blue-500" href="https://packagist.org/packages/youngdev/authy">https://packagist.org/packages/youngdev/authy</a></li>
            <li>Javascript: <a className="text-blue-500" href="https://www.npmjs.com/package/@mofogasy70/authy">https://www.npmjs.com/package/@mofogasy70/authy</a></li>
            <li>React: <a className="text-blue-500" href="https://www.npmjs.com/package/@youngdevmg/react-authy">https://www.npmjs.com/package/@youngdevmg/react-authy</a></li>
          </ul>
        </div>
      </div>,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="min-h-min space-y-2 p-2">
      <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1 ">
        <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
        <Breadcrumb.Item className="md:text-lg">Application</Breadcrumb.Item>
      </Breadcrumb>
      <div className=" bg-white p-2 space-y-3 rounded-lg">
        <div className="h-12 border-b-2 w-full flex items-center">Manage your Application :</div>
        <Input value={s_name} onChange={setTemps_name}  className="h-11 w-full sm:w-1/2" suffix={<SearchOutlined />} placeholder="search by App Id or App Name" />
        <div className="flex w-full sm:w-1/4 justify-start items-center space-x-2">
          <div className="min-w-min">sort by:</div>
          <Select
            className="h-11 flex-grow font-blinkmacsystem"
            defaultValue="DomainName"
            onChange={sets_order}
            options={[
              { value: 'DomainName', label: 'Name A-Z' },
              { value: 'createdAt', label: 'Date created' },
            ]}
          />
          <div><Segmented
            options={[
              { value: 'List', icon: <BarsOutlined /> },
              { value: 'Kanban', icon: <AppstoreOutlined /> },
            ]}
          /></div>
        </div>
        <List
          grid={{ gutter: 3, column: 3 }}
          className="bg-slate-50 w-full border p-1 font-blinkmacsystem"
          dataSource={LApplication}
          loading={LAppL}
          renderItem={(item) => (
            <List.Item className="w-full h-full">
                <div className=" bg-white w-full p-2 rounded-sm space-y-1">
                  <div className=" h-4/6 w-full flex">
                    <div className="hidden  min-w-min sm:flex items-center justify-center">
                      <div className="h-full w-full bg-blue-100 ">
                        <Link to={"./"+item._id}><img className="h-24 w-24" src={VITE_URIAPI+item.Logo} /></Link>
                      </div>
                    </div>
                    <div className="w-3"></div>
                    <div className="flex-grow font-blinkmacsystem">
                      <div className="text-sm sm:text-base">{item.DomainName}</div>
                      <div className="text-xs text-gray-500">ID:{item.AppId}</div>
                      <div className="text-xs text-gray-500">Categorie:{item.Platform.Name}</div>
                    </div>
                  </div>
                  <div className="w-full items-center  flex space-x-3 h-2/6 border-t">
                    <div className="h-full w-1/2 sm:w-1/4 p-1">
                      {devService.toTag(item.status)}
                    </div>
                    <div className="h-full w-1/2 sm:w-3/4 flex justify-end items-center space-x-2">
                      <EditTwoTone />
                      <DeleteTwoTone twoToneColor="#eb2f96" />
                    </div>
                  </div>
                </div>
            </List.Item>
          )}>
        </List>
        <div>
          <Button className="bg-green-500 text-white font-blinkmacsystem" onClick={showModal}>Create</Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Steps current={current} items={items} />
            <div>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
              {current < steps.length - 1 && (
                <Button className="bg-green-500 text-white" onClick={() => {
                  try {
                    if (DomainName.trim() === '') {
                      throw new Error("Name is empty !")
                    }
                    if (Categorie === '') {
                      throw new Error("Categorie is empty  !")
                    }
                    if (Platform === '' && current > 0) {
                      throw new Error("Platform is empty !")
                    }
                    if (Platform === '' && current > 0) {
                      throw new Error("Platform is empty !")
                    }
                    next();
                  } catch (error) {
                    message.error("" + error);
                  }
                }}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button className="bg-green-500 text-white" onClick={createAppdev}>
                  Finish
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Modal>
        </div>
      </div>
      <div className="h-5"></div>
    </div>
  );
}
export default Application;
