import axios from 'axios';

import { useEffect, useState } from 'react';

const Userapi=(token)=>{
const [islogin,setislogin]=useState(false);
const [isadmin,setisadmin]=useState(false);
const [user,setuser]=useState({});
const [alluser,setalluser]=useState(null);

    useEffect(()=>{
        const getuser=async()=>{
            
            try {
                if(token){
                    
                const res=await axios.get(`${process.env.REACT_APP_API_LINK}/user/getuser`,{
                    headers:{Authorization:token}
                })    
                
                if(res.data.user.role===1)
                    { 
                        const all=await axios.get(`${process.env.REACT_APP_API_LINK}/user/getalluser`,{
                            headers:{Authorization:token}
                        });
                        setalluser(all.data.users);
                        setisadmin(true);
                    }
                setuser(res.data.user);
                setislogin(true)
            }
            } catch (error) {
                console.log(error);
                
            }
        }
        getuser();
    },[token])

    return({
        islogin:[islogin,setislogin],
        isadmin:[isadmin,setisadmin],
        user:[user,setuser],
        alluser:[alluser,setalluser]
    });
}
export default Userapi