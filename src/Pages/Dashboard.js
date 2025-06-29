import React from 'react'
import Sidebar from '../Components/Core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='flex flex-row w-full h-full pb-5'>
            <Sidebar />

            <div className='flex flex-row w-full h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
