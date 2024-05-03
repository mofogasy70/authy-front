import { useEffect, useState } from "react";
import userService from "../../../service/user/userService";
import ActivityService from "../../../service/Activity/ActivityService";

const UseLogic = () => {
    const [LActivity, setLActivity] = useState();
    useEffect(() => {
        const fetchActivity = async () => {
            const lActivity = await userService.getActivitysUser();
            setLActivity(lActivity);
        }
        fetchActivity();
    }, [LActivity]);
    const columns = ActivityService.getcolumns();
    return {
        LActivity,
        columns
    }
}
export default UseLogic;