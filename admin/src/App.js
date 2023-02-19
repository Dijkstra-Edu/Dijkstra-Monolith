import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { Route, Routes } from 'react-router-dom';

import CreatePost from './components/CreatePost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import UpdatePost from './components/UpdatePost';

export default function App() {

  const [closeNav, setCloseNav] = useState(false) //Using useState hook for state of Nav bar
  const toggleNav = () => {
    setCloseNav(!closeNav);
  };

  const getWidthNav = () => (closeNav ? 'w-16' : 'w-56'); //function to decide width based on state of closeNav

  return (
    <div className='flex'>
      {/* Nav Section */}
      <div className={getWidthNav() + ' bg-red-100 transition-width'}>
        <NavBar/>
      </div>


      {/* Content Section */}
      <div className="flex-1 h-screen">
        <button onClick={toggleNav}>
          {closeNav ? <AiOutlineMenu size={25} /> : <RxCross1 size={25} />}
        </button>

    
        <div className="max-w-screen-lg mx-auto"> {/*Centre Screen*/}
          <Routes> {/*For handling routes*/}
            <Route path='/' element={<Home/>}/> {/*Redirects to Home Component*/}
            <Route path='/create-post' element={<CreatePost/>}/> {/*Redirects to Home Component*/}
            <Route path='/update-post' element={<UpdatePost/>}/> {/*Redirects to Home Component*/}
            <Route path='*' element={<NotFound/>}/> {/*Redirects to Home Component*/}
          </Routes>
        </div>
      </div>
    </div>
  )
}
