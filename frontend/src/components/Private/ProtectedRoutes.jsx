import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useContext } from 'react'
import Userauth from '../context/Userauth'
const ProtectedRoutes = () => {
    const currentauth = useContext(Userauth);
    console.log(currentauth.AUTH_STATUS.USER_AUTH)
  return (
    currentauth.AUTH_STATUS.USER_AUTH || currentauth.AUTH_STATUS.ADMIN_AUTH? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes