import React, { useContext } from 'react'
import Header from '../others/Header'
import Tasklistnumbers from '../others/Tasklistnumbers'
import Taskelist from '../tasklist/Taskelist'
import { Auth } from '../../context/Authprovider'

const Employedashboard = () => {
  
  const auth=useContext(Auth)
  
  const [user]=auth.userapi.user;
  
  return (
    <div className='p-10 max-w-screen h-screen   bg-[#1c1c1c]'>
        <Header name={user.name} />
        <Tasklistnumbers taskcount={user.taskcount}/>
        <Taskelist tasks={user.tasks}/>
    </div>
  )
}

export default Employedashboard