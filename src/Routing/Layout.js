import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Header';
import AddUser from '../Components/AddUser';
import ViewClient from '../Components/ViewClient';

const Layout = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Header />}>
            <Route path='/view' element={<ViewClient />}></Route>
            <Route path='/adduser' element={<AddUser />}></Route>

            
            </Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Layout