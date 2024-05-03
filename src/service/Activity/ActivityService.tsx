import { Tag } from "antd";
import daysj from "dayjs";
import { useRef } from "react";
class ActivityService {
    constructor() {
        
    }
    public static formatStatus(number: number) {
        switch (number) {
          case 3:
            return <Tag color="red">Very Important</Tag>;
          case 2:
            return <Tag color="yellow">Important</Tag>;
          case 1:
            return <Tag color="green">Less Important</Tag>;
          default:
            return <Tag color="gray">Unknown Status</Tag>;
        }
    }
    public static getcolumns(){
    const columns = [
        {
          title: 'date',
          render: (User: any) => (<>{daysj(new Date(User.date)).format('hh:mm dddd D MMMM YYYY')}</>)
        },
        {
          title: 'description',
          render: (User: any) => (<>{User.description}</>)
        },
        {
          title: 'status',
          render: (User: any) => (<>{ActivityService.formatStatus(User.status)}</>)
        },
      ];
      return columns;
    }
}
export default ActivityService;