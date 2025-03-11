import Tab from '@/components/Tab'
import React from 'react'
import { Outlet } from 'react-router-dom'

const FourmateurLayout = () => {
  return (
    <>
    <Tab item='fourmateurs' />
    <Outlet/>
    </>
  )
}

export default FourmateurLayout