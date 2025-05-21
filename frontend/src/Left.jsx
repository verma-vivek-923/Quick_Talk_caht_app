import React from 'react'
import Search from './left/search'
import Users from './left/users'

const Left = ({drawerClass}) => {
  return (
    <div className={`${drawerClass} py-2 pt-4 h-screen bg-gray-800 `}>
        {/* <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label> */}
     {/* <Search/> */}
     <Users/>
    </div>
  )
}

export default Left
