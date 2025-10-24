import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageNotFound, Password, Profile, Recovery, Register, Reset, UserName } from "../components";
import { AuthorizUser, ProtectRoute } from "../middleware/auth.js";

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserName/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/recovery' element={<Recovery/>} />
            <Route path='/reset' element={<Reset/>} />
            <Route path='/profile' element={<AuthorizUser><Profile/></AuthorizUser>} />
            <Route path='/password' element={<ProtectRoute><Password/></ProtectRoute>} />
            <Route path='*' element={<PageNotFound/>} />
        </Routes>
    </div>
  )
}
