import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
        <ul> {/* Simple Way to setup Navigation via Routing in React JS */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/create-post">Create Post</NavLink></li>
            <li><NavLink to="/comments">Comments</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
        </ul>
    </nav>
  )
}
