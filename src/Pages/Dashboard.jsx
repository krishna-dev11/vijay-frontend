import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Core/DashBoard/LeftPart/SideBar'

const Dashboard = () => {
  return (
    // 'fixed' hatakar 'relative flex' kiya taaki responsiveness smooth rahe
    <div className='relative flex w-full h-screen bg-black overflow-hidden'>
      
      {/* Sidebar adjusts its width internally based on screen size */}
      <SideBar/>

      {/* Main Content Area: Takes the remaining space automatically */}
      <div className='flex-1 h-full border-l border-white/5 bg-black overflow-auto custom-scrollbar '>
          <div className='mx-auto py-[50px]'>
             <Outlet/>
          </div>
      </div>
      
    </div>
  )
}

export default Dashboard