import Tab from '@/components/Tab'
import React from 'react'
import { Outlet } from 'react-router-dom'

const EmployeLayout = () => {
  return (
    <>
    <Tab item='participants' />
    <Outlet/>
    </>
  )
}

export default EmployeLayout