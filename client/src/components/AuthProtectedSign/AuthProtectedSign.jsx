import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthProtectedSign = () => {
    const {currentUser}=useSelector((state) => state.user)
    return (
          !currentUser ? <Outlet /> : <Navigate to={"/dashboard"}/>
    )
}

export default AuthProtectedSign