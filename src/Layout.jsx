import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { DashboardProvider } from './components/context/DashboardContext'

function Layout() {
    return (
        <DashboardProvider>
            <div className='flex min-h-screen flex-col bg-slate-50'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </DashboardProvider>
    )
}

export default Layout