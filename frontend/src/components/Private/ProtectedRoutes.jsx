import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useContext } from 'react'
import Userauth from '../context/Userauth'
const ProtectedRoutes = () => {
    const currentauth = useContext(Userauth);
    console.log(currentauth.AUTH_STATUS.USER_AUTH)
  return (
       true ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes