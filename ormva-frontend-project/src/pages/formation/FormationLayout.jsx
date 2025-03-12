import Tab from '@/components/Tab'
import React from 'react'
import { Outlet } from 'react-router-dom'

const FormationLayout = () => {
  return (
    <>
        <Tab item='formations' />
        <Outlet/>
    </>
  )
}

export default FormationLayout