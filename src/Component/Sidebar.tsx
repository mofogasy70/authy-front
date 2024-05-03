import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import jwtDecode from "jwt-decode";
import Sider from 'antd/es/layout/Sider';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/es/menu/SubMenu';
import logo from '../assets/authylogo.png'
interface SidebarProps {
    menumode: boolean;
    menu:IMenu[];
    setMenumode: React.Dispatch<React.SetStateAction<boolean>>;
}
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
const Sidebar: React.FC<SidebarProps> = ({ menumode, setMenumode,menu }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const isMobile = windowSize < 768;
    const token: any = localStorage.getItem('token');
    const decode: any = jwtDecode(token);
    const [role, setRole] = useState("");
    const [activeMenuItem, setActiveMenuItem] = useState('/acceuil');
    useEffect(() => {
        setRole("user");
        const handleResize = () => { setWindowSize(window.innerWidth); };
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); };
    }, [])

    const handleMenuItemClick = (path: string) => {
        setActiveMenuItem(path);
    }
    const [sidebarVisible, setSidebarVisible] = useState(true);
    return (
        <Sider className="min-h-screen border" collapsed={isMobile} hidden={menumode}>
            <div className='h-16 flex items-center justify-center border-b-1 '><img className='h-full' src={logo} /></div>
            <div className='h-16 flex items-center justify-center'></div>
            {menu.map((menu: IMenu, index: number = 2) => (
                <Menu key={index} mode="inline" selectedKeys={[activeMenuItem]}>
                    <SubMenu className='font-blinkmacsystem' key={index} title={menu.title} icon={menu.icon} >
                        {menu.submenu.map((submenud: IsubMenu, index: number = 2) => (
                            <Menu.Item key={submenud.link} onClick={() => handleMenuItemClick(submenud.link)}><Link to={submenud.link} className='space-x-1 flex'>
                                <p>{submenud.icon}</p>
                                <p>{submenud.title}</p>
                            </Link></Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            ))}
        </Sider>
    );
}
export default Sidebar;




