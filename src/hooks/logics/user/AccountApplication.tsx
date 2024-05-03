import { TabsProps, Tag, Select, Table, Popconfirm, Button } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VITE_URIAPI } from "../../../constant";
import Chart from "react-apexcharts";
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
  interface IConLogData {
    _id: {
      UserApplication: string;
      Day: number;
      Month: number;
      Year: number;
    }
    count: number;
  }
  interface Iseries {
    name: string;
    data: number[]
  }

const Uselogic=()=>{
    const { id } = useParams();
  const [Application, setApplication] = useState<string[]>([]);
  const [App, setApp] = useState<any>();
  const uri = VITE_URIAPI;

  const [info, setInfo] = useState<any>();
  const [infostatus, setInfostatus] = useState<boolean>(false);
  const [LConLog, setLConLog] = useState<[IConLogData[]]>([[]]);
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [Year, setYear] = useState((new Date().getFullYear()).toString());
  const [LITypeSecuritysWithChild, setITypeSecuritysWithChild] = useState<ITypeSecuritysWithChild[]>()
  const [TabDevice, setTabDevice] = useState<any[]>([]);

  let YearOptionData: any[] = [];
  for (let index = 1990; index <= 2023; index++) {
    YearOptionData.push({
      value: index,
      label: index
    });
  }

  const Tabseries: Iseries[] = [];
  const Xtab: string[][] = []
  for (let index = 0; index < LConLog?.length; index++) {
    Xtab[index] = []
    let seriesTemp: Iseries = { name: index.toString(), data: [] }
    for (let index2 = 0; index2 < LConLog[index].length; index2++) {
      Xtab[index].push(new Date(LConLog[index][index2]._id.Year, LConLog[index][index2]._id.Month, LConLog[index][index2]._id.Day).getDate().toString());
      seriesTemp.data.push(LConLog[index][index2].count);
    }
    Tabseries.push(seriesTemp);
  }

  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: Xtab[0]
      }
    },
    series: [Tabseries[0]]
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (id) {
      Application.push(id);
    }
    const JSONdata = {
      date: new Date(Year + "-" + month + "-01"),
      Application: Application,
    };
    const fetchRole = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/ConLog/', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
          const data = await response.json();
          setLConLog(data);
          console.log(data);

        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    const fetchApplication = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/Application/' + id, {
          method: 'GET',
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setApp(data);
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    async function fechusecurity() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const JSONdata = {
          Application: App?._id,
        };
        const url = uri + '/API/TypeSecurity/TypeSecuritysWithChild';
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(JSONdata)
        });
        if (response.ok) {
          const data = await response.json();
          setITypeSecuritysWithChild(data);
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    const fetchDevice = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/ConLog/getDeviceList', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ Application: id })
        });
        if (response.ok) {
          const data = await response.json();
          setTabDevice(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchDevice();
    fechusecurity();
    fetchRole();
    fetchApplication();
  }, [Year, month]);

  const onChange = (key: string) => {
    console.log(key);
    setTabDevice([])
  };
  const items: TabsProps['items'] = [
    {
      key: 'Graphe',
      label: <Tag color="green">Graphique</Tag>,
      children: <div className="mt-2 min-h-min space-y-3">
        <div className="md:flex items-center md:space-x-1">
          <div className="w-2/5 space-y-2">
            <p>month</p>
            <Select onChange={setMonth} style={{ width: "100%" }} defaultValue={month}>
              <option key="01" value="01">january</option>
              <option key="02" value="02">february</option>
              <option key="03" value="03">march</option>
              <option key="04" value="04">april</option>
              <option key="05" value="05">may</option>
              <option key="06" value="06">june</option>
              <option key="07" value="07">july</option>
              <option key="08" value="08">august</option>
              <option key="09" value="09">september</option>
              <option key="10" value="10">october</option>
              <option key="11" value="11">november</option>
              <option key="12" value="12">december</option>
            </Select>
          </div>
          <div className="w-2/5 space-y-2">
            <p>Year</p>
            <Select onChange={setYear} defaultValue={Year} style={{ width: "100%" }}
              options={YearOptionData}
            >
            </Select>
          </div>
        </div>
        <div className="h-96">
          <Chart
            height={"100%"}
            options={state.options}
            series={state.series}
            type="line"
          />
        </div>
      </div>,
    },
    {
      key: 'Table',
      label: <Tag color="blue">Table</Tag>,
      children: <div className="mt-2 min-h-min space-y-3">
        <div className="md:flex items-center md:space-x-1">
          <div className="w-2/5 space-y-2">
            <p>month</p>
            <Select onChange={setMonth} style={{ width: "100%" }} defaultValue={month}>
              <option key="01" value="01">january</option>
              <option key="02" value="02">february</option>
              <option key="03" value="03">march</option>
              <option key="04" value="04">april</option>
              <option key="05" value="05">may</option>
              <option key="06" value="06">june</option>
              <option key="07" value="07">july</option>
              <option key="08" value="08">august</option>
              <option key="09" value="09">september</option>
              <option key="10" value="10">october</option>
              <option key="11" value="11">november</option>
              <option key="12" value="12">december</option>
            </Select>
          </div>
          <div className="w-2/5 space-y-2">
            <p>Year</p>
            <Select onChange={setYear} defaultValue={Year} style={{ width: "100%" }}
              options={YearOptionData}
            >
            </Select>
          </div>
        </div>
        <div className="h-96">
          <Table></Table>
        </div>
      </div>,
    },
  ];

  const columns = [
    {
      title: 'Name',
      render: (User: any) => (<></>),
    },
    {
      title: 'Type',
      render: (User: any) => (<>{User._id.device}</>)
    },
    {
      title: 'System',
      render: (User: any) => (<>{User._id.system}</>)
    },
    {
      title: 'Action',
      render: (User: any) => (<div>
        <Popconfirm
          title="block this device"
          description="Are you sure to delete this Secutity?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => { }}
        ><Button className="bg-red-600 text-white">Block</Button></Popconfirm>
      </div>)
    },
  ];
  const columns2 = [
    {
      title: 'Name',
      render: (User: any) => (<></>),
    },
    {
      title: 'Type',
      render: (User: any) => (<>{User._id.device}</>)
    },
    {
      title: 'System',
      render: (User: any) => (<>{User._id.system}</>)
    },
    {
      title: 'Action',
      render: (User: any) => (<div>
        <Popconfirm
          title="block this device"
          description="Are you sure to delete this Secutity?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => { }}
        ><Button className="bg-green-600 text-white">deblock</Button></Popconfirm>
      </div>)
    },
  ];

  const onChangedevice = (key: string) => {
    console.log(key);
    //setTabDevice([])
  };
  const itemsdevice: TabsProps['items'] = [
    {
      key: 'Active',
      label: <Tag color="green">Active</Tag>,
      children: <div className="mt-2"><Table pagination={{ pageSize: 2 }} dataSource={TabDevice} className="w-full rounded-lg" columns={columns} ></Table></div>,
    },
    {
      key: 'Blocked',
      label: <Tag color="red">Blocked</Tag>,
      children: <div className="mt-2"><Table pagination={{ pageSize: 2 }} dataSource={TabDevice} className="w-full rounded-lg" columns={columns2}  ></Table></div>,
    },
  ];
  return{
    App,
    items,
    onChange,
    itemsdevice,
    onChangedevice,
    LITypeSecuritysWithChild,
    setInfo,
    setInfostatus
  }
}
export default Uselogic;