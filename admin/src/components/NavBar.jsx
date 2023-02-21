import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineFileAdd, AiOutlineComment, AiOutlineSetting } from 'react-icons/ai'
import { TbPresentationAnalytics } from 'react-icons/tb'
import { MdOutlineGroups, MdNotificationsNone, MdOutlineManageAccounts } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
//import {BsPencil} from 'react-icons/bs'

const NavItem = ({ to, value, closed, icon, extended }) => {//Simple Function for code reusability in handling icons
  const commonClasses = "flex items-center space-x-2 w-full p-2 block whitespace-nowrap " + extended
  const activeClass = commonClasses + ' bg-gray-200 text-black'
  const inActiveClass = commonClasses + ' text-gray-500'
  return (
    <NavLink className={({ isActive }) => (isActive ? activeClass : inActiveClass)} to={to}>
      {icon}<span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-24 transition-width'}>{value}</span>
    </NavLink>
  );
};

export default function NavBar({ closed }) {
  return (
    <nav>
      {/* <div className='flex justify-center p-3'>
        <img className='w-14' src="../JRS.png" alt="" />
      </div> */}
      <ul> {/* Simple Way to setup Navigation via Routing in React JS (See Commit #1 - 20.02.2023) */}
        {/* <li className='mb-5 bg-[#008000]'><NavItem extended="text-black" closed={closed} to="/create-post" value="Create Post" icon={<AiOutlineFileAdd size={24} />} /></li> */}
        <li><NavItem extended="text-black" closed={closed} to="/create-post" value="Create Post" icon={<AiOutlineFileAdd size={24} />} /></li>
        <li>   </li>

        <li><NavItem closed={closed} to="/" value="Home" icon={<AiOutlineHome size={24} />} /></li>
        <li><NavItem closed={closed} to="/analytics" value="Analytics" icon={<TbPresentationAnalytics size={24} />} /></li>
        <li><NavItem closed={closed} to="/tag-groups" value="Tag Groups" icon={<MdOutlineGroups size={24} />} /></li>
        <li><NavItem closed={closed} to="/trash" value="Trash" icon={<BsTrash size={24} />} /></li>
        <li><NavItem closed={closed} to="/notifications" value="Notifications" icon={<MdNotificationsNone size={24} />} /></li>
        <li><NavItem closed={closed} to="/accounts" value="Accounts" icon={<MdOutlineManageAccounts size={24} />} /></li>
        {/* <li><NavItem closed={closed} to="/update-post-list" value="Update Post" icon={<BsPencil size={24}/>}/></li>To be done by yourself */}
        <li><NavItem closed={closed} to="/comments" value="Comments" icon={<AiOutlineComment size={24} />} /></li>
        <li><NavItem closed={closed} to="/settings" value="Settings" icon={<AiOutlineSetting size={24} />} /></li>
      </ul>
    </nav>
  )
}
