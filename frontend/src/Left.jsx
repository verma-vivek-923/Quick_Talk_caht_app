import React from 'react'
import selection from './context/selection'
import Dashboard from './dashboard/Dashboard'
import Users from './left/Users'

const Left = ({drawerClass}) => {

  const {selectOption}=selection();

  return (
    <div className={`${drawerClass}  h-[100dvh] bg-gray-800 `}>
        {/* <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label> */}
     {/* <Search/> */}

 {selectOption === "chat" ? <Users/> :  <Dashboard/>}
     
    
    </div>
  )
}

export default Left
