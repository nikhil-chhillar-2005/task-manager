import axios from 'axios'
import React, { useContext } from 'react'
import { Auth } from '../../context/Authprovider'

const Header = ({name}) => {
  const auth=useContext(Auth);
  const setislogin=auth.userapi.islogin[1]
  const setisadmin=auth.userapi.isadmin[1]
  const setuser=auth.userapi.user[1]
  const settoken=auth.token[1]
  const setalluser=auth.userapi.alluser[1]
  const logoutuser=async()=>{
    try {
      await axios.get(`${process.env.REACT_APP_API_LINK}/user/logout`)
     setisadmin(false);
     setislogin(false);
     settoken(null);
     setuser({});
     setalluser(null);
     localStorage.clear();
      
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br/> <span className='text-3xl font-semibold'> {name} 👋</span></h1>
        <button onClick={logoutuser} className='bg-red-500 text-lg font-medium px-5 py-2rounded'>Log Out</button>
    </div>
  )
}

export default Header