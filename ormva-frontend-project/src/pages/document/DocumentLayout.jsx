import Tab from '@/components/Tab'
import { Outlet } from 'react-router-dom'

const DocumentLayout = () => {
  return (
    <>
    <Tab item='Documents pedagogique' />
    <Outlet/>
    </>
  )
}

export default DocumentLayout