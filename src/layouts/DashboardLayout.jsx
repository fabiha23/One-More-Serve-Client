import { Outlet } from 'react-router'
import Sidebar from '../Components/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen lg:flex bg-base-200'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1'>
        <div className='p-5 min-h-screen'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout