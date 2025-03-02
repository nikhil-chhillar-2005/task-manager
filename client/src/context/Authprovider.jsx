import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import userapi from '../api/api'

export const Auth = createContext();



const Authcontext = ({ children }) => {
   const [token, settoken] = useState(null);
   const refreshtoken=async()=>{
    try {
      const res=await axios.post('/user/refreshtoken');
      settoken(res.data.accesstoken);    
    } catch (error) {
      console.log(error);     
    }
  }
    useEffect(() => {
      const firstlogin=localStorage.getItem('firstlogin');
      if(firstlogin) refreshtoken();
  },[]);
  const state={
    userapi:userapi(token),
    token:[token,settoken],
    
}

  return (
    <div>
      <Auth.Provider value={state}>
        {children}
        </Auth.Provider>
    </div>
  );
};

export default Authcontext;
