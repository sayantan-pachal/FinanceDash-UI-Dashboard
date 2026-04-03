import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import DashboardHome from './components/Dashboard/DashboardHome.jsx'
import Edgecase from './components/Others/Edgecase.jsx'
import { DashboardProvider } from './components/context/DashboardContext.jsx'
import Privacy from './components/Others/Privacy.jsx'
import Terms from './components/Others/Terms.jsx'
import Support from './components/Others/Support.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      {/* 1. The Intro/Landing Page (Standalone) */}
      <Route index element={<Home />} />
      {/* 2. The Dashboard Protected Area (Wrapped in Sidebar/Header Layout) */}
      <Route element={<Layout />}>
        <Route path='dashboard' element={<DashboardHome />} />
        <Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/support" element={<Support />} />
        {/* You can add more routes here like 'profile' or 'settings' later */}
        {/* 3. 404 - The "Catch-All" route */}
        <Route path='*' element={<Edgecase />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire provider here so data persists across all routes */}
    <DashboardProvider>
      <RouterProvider router={router} />
    </DashboardProvider>
  </React.StrictMode>,
)