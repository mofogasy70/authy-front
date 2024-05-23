import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { VITE_URIAPI } from "../../../constant";
import CardStat from "../../../Component/card/dashboardCard";
import { RequestIcon } from "../../../assets/icon/RequestIcon";
import { DeviceIcon } from "../../../assets/icon/DeviceIcon";
import { AppIcon } from "../../../assets/icon/AppIcon";
import { ErrorIcon } from "../../../assets/icon/ErrorIcon";
interface Event {
  start: Date;
  end: Date;
  title: string;
  color?: string;
}

const Dashboard: React.FC = () => {
  const token: any = localStorage.getItem('token');
  const localizer = momentLocalizer(moment);
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<Event[]>([]);

  const eventPropGetter = (event: Event) => {
    const backgroundColor = event.color || 'blue';
    return {
      style: { backgroundColor },
      className: "bg-blue"

    };
  };

  const formatData = (data: any[]) => {
    const response: Event[] = []
    for (let index = 0; index < data.length; index++) {
      response.push({
        end: new Date(data[index].end),
        start: new Date(data[index].start),
        title: data[index].title,
        color: data[index].color
      })
    }
    return response;
  }
  const week = useCallback(async () => {
    setLoading(true)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) { headers.append('x-auth-token', token); }
    try {
      const response = await fetch(VITE_URIAPI + '/API/Conlog/getWeekleConLogs', {
        method: 'GET',
        headers: headers,
      });
      if (response.ok) {
        const data: any[] = await response.json();
        setEvents(formatData(data))
      } else {
        throw new Error('Failed to fetch weekle logs data');
      }
    } catch (error) {
      throw error
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    week()
  }, [week])

  return (
    <div className="min-h-screen space-y-4 mb-2 font-blinkmacsystem">
      <div className="w-full h-10 flex items-center justify-start text-sm p-1">
        <Breadcrumb className="w-full h-10 flex items-center justify-start text-sm p-1">
          <Breadcrumb.Item><Link to={"/Acceuil"}><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item className="md:text-lg">Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex space-x-2 max-h-min  w-full font-blinkmacsystem">
        <CardStat
          icon={<RequestIcon />}
          value={3}
          title="Request"
          subTitle="you used Authy-Sign"
        />
        <CardStat
          icon={<ErrorIcon />}
          value={3}
          title="Error"
          subTitle="connection failed/Error"
        />
        <CardStat
          icon={<AppIcon />}
          value={3}
          title="Applcation"
          subTitle="application you used Authy"
        />
        <CardStat
          icon={<DeviceIcon />}
          value={3}
          title="Device"
          subTitle="device you are used"
        />
      </div>
      <div className="shadow-md bg-white p-3 w-full rounded-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          defaultView={"week"}
          eventPropGetter={eventPropGetter}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}
export default Dashboard;
