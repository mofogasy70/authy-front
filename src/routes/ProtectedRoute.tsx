import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/navbar/Navbar";
import userService from "../service/user/userService";
import { Spin, message } from "antd";
import Foot from "../Component/Foot";
import jwtDecode from "jwt-decode";
import { VITE_URIAPI } from "../constant";
import { io } from "socket.io-client";

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
  const token: any = localStorage.getItem('token');
  const decode: any = jwtDecode(token);
  const socket = io(VITE_URIAPI);
  const [messageApi, contextHolder] = message.useMessage();
  async function notification(type: 'success' | 'error', message: string) {
    await messageApi.open({
      type: type,
      content: message,
      duration: 1.5,
    });
  }
  socket.on(String(decode.UserId), (data: any) => {
    notification(data.type, data.message);
  });
  const test = () => {
    socket.emit('notification', { type: "success", message: "tsy nety", UserId: "663a0d099aa6f42ace6861f3", user: String(decode.UserId) });
  }
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
      {contextHolder}
      <div className="flex min-h-min w-full ">
        <Sidebar menumode={menumode} menu={Sidebartab} setMenumode={setMenumode} />
        <div className="w-full h-auto bg-[#EFF3F4]">
          <Navbar menumode={menumode} setMenumode={setMenumode} />
          <div className="flex w-full min-h-min  items-center justify-center">
            <div className="w-full md:w-11/12 min-h-min">
              {element}
            </div>
          </div>
          <div className="mt-5 h-12 bg-white flex items-center justify-start font-blinkmacsystem">
            <div className="flex items-center justify-center space-x-2 ml-1">
              <div className="font-semibold text-xs text-gray-600">Copyright © September 2023 </div>
              <div className="text-blue-400 text-xs font-semibold">YOUNGDEV .</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProtectedRoute;
