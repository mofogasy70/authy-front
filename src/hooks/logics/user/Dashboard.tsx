import { useState, useEffect } from "react";
import { VITE_URIAPI } from "../../../constant";
import ActivityService from "../../../service/Activity/ActivityService";
import userService from "../../../service/user/userService";
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
const Uselogic = () => {
  const uri = VITE_URIAPI;
  const [LConLog, setLConLog] = useState<[IConLogData[]]>([[]]);
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [Year, setYear] = useState((new Date().getFullYear()).toString());
  const [Application, setApplication] = useState<string[]>(["6519767f6e29ff41fcdd4d35"]);
  const [TabApplication, setTabApplication] = useState<any[]>([]);
  const [LActivity, setLActivity] = useState();
  const [more, setmore] = useState<any>(<></>);
  const [moreStatus, setmoreStatus] = useState<boolean>(false)

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
      yaxis: {
        labels: {
          formatter: function (val: number) {
            return val.toFixed(0);
          }
        }
      },
      chart: {
        id: 'area',
      },
      xaxis: {
        categories: Xtab[0]
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#00ff00'],
    },
    series: Tabseries,
    stroke: {
      curve: 'smooth',
    }
  };
  let YearOptionData: any[] = [];
  for (let index = 1990; index <= 2023; index++) {
    YearOptionData.push({
      value: index,
      label: index
    });
  }
  useEffect(() => {
    const JSONdata = {
      date: new Date(Year + "-" + month + "-01"),
      Application: Application,
    };
    const token = localStorage.getItem('token');
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
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    const fetchApp = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (token) { headers.append('x-auth-token', token); }
      try {
        const response = await fetch(uri + '/API/UserApplication/findAppByUserId', {
          method: 'GET',
          headers: headers,
        });
        if (response.ok) {
          const data = await response.json();
          setTabApplication(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch roles');
        }
      } catch (error) {
        alert(error);
      }
    };
    const fetchActivity = async () => {
      const lActivity = await userService.getActivitysUser();
      setLActivity(lActivity);
    }
    fetchActivity();
    fetchApp();
    fetchRole();
  }, [month, Year, Application]);


  const columns = [
    {
      title: 'Latitude',
      render: (User: any) => (<>{User._id.CorLat}</>),
    },
    {
      title: 'Longitude',
      render: (User: any) => (<>{User._id.CorLong}</>)
    },
    {
      title: 'device Type',
      render: (User: any) => (<>{User._id.device}</>)
    },
    {
      title: 'System exp',
      render: (User: any) => (<>{User._id.system}</>)
    },
    {
      title: 'IP Address',
      render: (User: any) => (<>{User._id.IP}</>)
    },
    { title: '', dataIndex: 'count', key: 'count', },
  ];
  const columnsAct = ActivityService.getcolumns();
  function formMore(item: any) {
    setmore(
      <>
        <p>exploitation system : {item._id.system}</p>
        <p>device type :{item._id.device}</p>
        <p>Ip Address :{item._id.IP}</p>
        <p>lat :{item._id.CorLat}</p>
        <p>long :{item._id.CorLong}</p>
      </>
    );
  }
  return {
    setMonth,
    month,
    setYear,
    Year,
    YearOptionData,
    TabApplication,
    Application,
    setApplication,
    state,
    LActivity,
    columnsAct,
  }

}
export default Uselogic;