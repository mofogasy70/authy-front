import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/navbar/Navbar";
import userService from "../service/user/userService";
import { Spin } from "antd";
import Foot from "../Component/Foot";

interface IsubMenu {
  title: string,
  link: string,
  icon?: ReactNode
}
interface IMenu {
  title: string,
  icon?: ReactNode
  submenu: IsubMenu[]
}
interface ProtectedRouteProps {
  element: JSX.Element;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [menumode, setMenumode] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [Sidebartab, setSidebartab] = useState<IMenu[]>([]);
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await userService.checkToken(token);
          const responsesidebar = userService.getExactSidebar(token);
          setSidebartab(responsesidebar);
          setIsValid(response);
        } catch (error) {
          console.error(error);
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
      setLoading(false);
    };
    checkTokenValidity();
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div>
        <p>loading</p>
        <div className="flex items-center justify-center"><Spin></Spin></div>
      </div>
    </div>;
  }
  if (!isValid) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
    <div className="flex min-h-min w-full ">
      <Sidebar menumode={menumode} menu={Sidebartab} setMenumode={setMenumode} />
      <div className="w-full h-auto bg-[#EFF3F4]">
        <Navbar menumode={menumode} setMenumode={setMenumode} />
        <div className="flex w-full min-h-min  items-center justify-center">
          <div className="w-full md:w-11/12 min-h-min">
            {element}
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
    </div>
  );
};
export default ProtectedRoute;
