import React from 'react'
import { NavLink } from 'react-router-dom'
import {AiOutlineHome, AiOutlineFileAdd, AiOutlineComment, AiOutlineSetting} from 'react-icons/ai'

const NavItem = ({ to, value, closed, icon }) => {//Simple Function for code reusability in handling icons
  const commonClasses = "flex items-center space-x-2 w-full p-2 block whitespace-nowrap"
  const activeClass = commonClasses + ' bg-blue-500 text-white'
  const inActiveClass = commonClasses+ ' text-gray-500'
  return (
    <NavLink className={({isActive}) => (isActive? activeClass:inActiveClass)} to={to}>
      {icon}<span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width'}>{value}</span>
      </NavLink>
  );
};

export default function NavBar({closed}) {
  return (
    <nav>
      <div className='flex justify-center p-3'>
        <img className='w-14' src="../JRS.png" alt="" />
      </div>
      <ul> {/* Simple Way to setup Navigation via Routing in React JS (See Commit #1 - 20.02.2023) */}
        <li><NavItem closed={closed} to="/" value="Home" icon={<AiOutlineHome size={24}/>}/></li>
        <li><NavItem closed={closed} to="/create-post" value="Create Post" icon={<AiOutlineFileAdd size={24}/>}/></li>
        <li><NavItem closed={closed} to="/comments" value="Comments" icon={<AiOutlineComment size={24}/>}/></li>
        <li><NavItem closed={closed} to="/settings" value="Settings" icon={<AiOutlineSetting size={24}/>}/></li>
      </ul>
    </nav>
  )
}
