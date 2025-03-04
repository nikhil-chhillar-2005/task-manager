import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

    const submithandler=async(e)=>{
        e.preventDefault();
        try {
            const data={
                email:email,
                password:password
            }
            await axios.post('/user/login',data);
           localStorage.setItem('firstlogin',true);
            

        setemail('');
        setpassword('');
        window.location.href='/'
        } catch (error) {
            console.log(error);
            
            alert(error.response.data.message)         
        }
        
    }
   
    
  return (
    <div className='flex h-screen w-screen justify-center items-center '>
        <div className="border-2 border-emerald-600 p-20">
            <form onSubmit={submithandler} className='flex flex-col items-center justify-center'>
                <input value={email} onChange={(e)=>{ setemail(e.target.value)}}
                required={true} className=' outline-none bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 rounded-full py-3 text-xl px-5 ' type="email" placeholder='Enter your email' />
                <input autoComplete="true" value={password} onChange={(e)=>{ setpassword(e.target.value)}} required={true} className='outline-none mt-3 bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 rounded-full py-3 text-xl px-5 ' type="password" placeholder='Enter your password' />
                <button  className='text-white mt-5 outline-none   border-none bg-emerald-600 rounded-full py-3 text-xl px-5 '>Login</button>
            </form>
        </div>

    </div>
  )
}

export default Login