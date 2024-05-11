import React, { useEffect, useState } from 'react';
import { Button, Card, Dropdown, MenuProps } from 'antd';
import { SettingOutlined, UserOutlined, LogoutOutlined, MenuFoldOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import daysj from "dayjs";
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
declare const APP_VERSION: string
interface SidebarProps {
    menumode: boolean;
    setMenumode: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<SidebarProps> = ({ menumode, setMenumode }) => {
    const items: MenuProps['items'] = [
        { key: '1', label: <Link to={'/Account'}>My Account</Link>, icon: <UserOutlined /> },
        {
            key: '2', label: "Deconnexion", icon: <LogoutOutlined />, onClick: () => {
                localStorage.removeItem('token');
                window.location.reload();
            }
        },
        { key: '3', label: "Version : " + APP_VERSION, disabled: true },
    ];
    const items2: MenuProps['items'] = [
        {
            key: '1',
            label: <Card className='w-full'></Card>
        }
    ];
    return (
        <div className='w-full h-[70px] md:h-20 flex items-center justify-center md:sticky md:top-0 md:z-50 md:opacity-80 font-blinkmacsystem'>
            <div className='w-full h-full md:w-11/12 flex space-x-1 items-center'>
                <div className='w-52 md:w-60 h-10 md:h-14 flex bg-white items-center justify-center text-base md:text-lg shadow-md rounded-full hover:shadow-blue-300  ease-in duration-300 font-blinkmacsystem space-x-3'>
                    <MenuFoldOutlined  onClick={() => { setMenumode(!menumode) }} className='border-none min-w-min min-h-min flex justify-center items-center'/>
                    <div>{daysj(new Date()).format("ddd, MMMM YYYY")}</div>
                </div>
                <div className='flex-grow'></div>
                <Dropdown className='hidden w-14 h-14 md:flex items-center justify-center  bg-white rounded-full shadow-md hover:shadow-blue-300  ease-in duration-300 p-1 font-blinkmacsystem' menu={{ items: items2 }} arrow>
                    <NotificationOutlined />
                </Dropdown>
                <div className='hidden w-48 h-14 md:flex items-center justify-center  bg-white rounded-full p-1 shadow-md hover:shadow-blue-300 ease-in duration-300 font-blinkmacsystem' onClick={() => { window.location.href = '/UserPersonnalData'; }}>
                    <img className='w-1/4 h-full  rounded-full' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <div className='w-3/4 h-full flex items-center justify-center rounded-full p-1'>
                        <div>
                            <p className=''>Anjara Valisoa</p>
                            <p className='text-sm text-slate-700'>User</p>
                        </div>
                    </div>
                </div>
                <Dropdown className='h-10 w-10 md:w-14 md:h-14 flex items-center justify-center  bg-white rounded-full shadow-md hover:shadow-blue-300 ease-in duration-300' menu={{ items }} placement="bottom" arrow>
                    <SettingOutlined />
                </Dropdown>
            </div>
        </div>
    );
};
export default Navbar;