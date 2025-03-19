import Tab from '@/components/Tab'
import React from 'react'
import { Outlet } from 'react-router-dom'

const FourmateurLayout = () => {
  return (
    <>
    <Tab item='formateurs' />
    <Outlet/>
    </>
  )
}

export default FourmateurLayout