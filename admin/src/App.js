import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { Route, Routes } from 'react-router-dom';

import CreatePost from './components/CreatePost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import SearchBar from './components/SearchBar';
import UpdatePost from './components/UpdatePost';
//import UpdatePostMain from './components/UpdatePostMain';

export default function App() {

  const [closeNav, setCloseNav] = useState(false) //Using useState hook for state of Nav bar
  const toggleNav = () => {
    setCloseNav(!closeNav);
  };

  const getWidthNav = () => (closeNav ? 'w-12' : 'w-56'); //function to decide width based on state of closeNav

  return (

    <div className='flex'>

      {/* Nav Section */}
      <div className={getWidthNav() + ' transition-width min-h-screen bg-black'}>
        <div className="sticky top-0 px-2 py-3">
          <button onClick={toggleNav}>
            {closeNav ? <div className=''><AiOutlineMenu color='green' size={25} /></div> : <div className='relative transition-width left-0'><RxCross1 color='red' size={25} /></div>}
          </button>
        </div>

        <div className="sticky top-20 pt-40"><NavBar closed={closeNav} /></div>

      </div>

      {/* Content Section */}
      <div className="flex-1 min-h-screen">

        <div className="sticky top-0 bg-slate-100/60 z-50 backdrop-filter backdrop:blur-xl">
          <div className="flex items-center justify-center w-full p-2 space-x-2">
            <SearchBar />
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto"> {/*Centre Screen*/}
          <Routes> {/*For handling routes*/}
            <Route path='/' element={<Home />} /> {/*Redirects to Home Component*/}
            <Route path='/create-post' element={<CreatePost />} /> {/*Redirects to Create-Post Component*/}
            <Route path='/update-post/:slug' element={<UpdatePost />} /> {/*Redirects to Update-Post Component*/}
            {/* <Route path='/update-post-list' element={<UpdatePostMain />} /> Section of Main Page (Implement yourself) */}
            <Route path='*' element={<NotFound />} /> {/*Redirects to Home Component*/}
          </Routes>
        </div>
      </div>

    </div>
  )
}
