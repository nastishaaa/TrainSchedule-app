import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import './App.css'

import RootLayout from './layout/RootLayout'
import React, { lazy } from 'react'
import { Toaster } from 'react-hot-toast'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const TrainsListPage = lazy(() => import('./pages/TrainsListPage/TrainsListPage'));
const TrainDetailsPage = lazy(() => import('./pages/TrainDetailsPage/TrainDetailsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage/SupportPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage/UserProfilePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      { index: true, element: <HomePage /> as React.ReactElement },
      { path: '/trains', element: <TrainsListPage /> as React.ReactElement },
      { path: '/trains/:id', element: <TrainDetailsPage /> as React.ReactElement },
      { path: '/login', element: <LoginPage /> as React.ReactElement },
      { path: '/register', element: <RegisterPage /> as React.ReactElement },
      { path: '/support', element: <SupportPage /> as React.ReactElement },
      { path: '/profile', element: <UserProfilePage /> as React.ReactElement },
    ]
  }
])

function App() {
  
  return (
    <>
      <Toaster/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
