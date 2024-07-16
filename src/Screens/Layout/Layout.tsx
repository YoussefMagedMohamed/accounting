// import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.js"


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  )
}

export default Layout
