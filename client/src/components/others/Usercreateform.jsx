import axios from 'axios';
import React, { useState } from 'react'

const Usercreateform = () => {
    const [formdata,setformdata]=useState({
        Id:"",
        name:"",
        email:"",
        password:"",
        role:""
    })
    const handlechanges=(e)=>{
        const {name,value}=e.target;
        setformdata({...formdata,[name]:value});
    }
    const newuserform=async(e)=>{
        e.preventDefault();
        try {
            await axios.post('/user/register',formdata);
            setformdata({
                Id:"",
                name:"",
                email:"",
                password:"",
                role:""
                })
            const h1=document.createElement('h1');
            h1.classList="alert font-bold font-[32px] text-center"
            h1.textContent="User created";
            const form=document.querySelector('#form');
            form.prepend(h1);
            
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 5000);


        } catch (error) {
            console.log(error.response);
            
        }
    }

  return (
    <div>
        
        <div className="p-5 bg-[#1c1c1c] mt-6 " id='form'>
        <h1 className='text-center font-bold text-[28px] '>Create New User</h1>
            <form className='flex flex-wrap justify-between w-full items-center' onSubmit={newuserform} >
                <div className='sm:w-1/2 w-full'>
                    <div>
                        <h1 className="text-sm text-gray-500 mb-0.5">Employee ID</h1>
                        <input type="number" onChange={handlechanges} value={formdata.Id} name='Id' placeholder='id' className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" />
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-500 mb-0.5">Employee Name</h1>
                        <input type="text" onChange={handlechanges} value={formdata.name} name='name' placeholder='Enter name of employee' className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" />
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-500 mb-0.5">Employee E-mail</h1>
                        <input type="email" onChange={handlechanges} value={formdata.email} name='email' placeholder='Employee email' className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" />
                    </div>

                </div>
                <div className='sm:w-2/5 w-full'>
                    <div>
                        <h1 className="text-sm text-gray-500 mb-0.5">Employee Password</h1>
                        <input type="password" value={formdata.password} onChange={handlechanges} name='password' placeholder='Password' className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" />
                    </div>
                    <div>
                        <h1 className="text-sm text-gray-500 mb-0.5">Employee Role(1 if admin else 0)</h1>
                        <input type="number" value={formdata.role} onChange={handlechanges} name='role' placeholder='id' className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" />
                    </div>
                    <button type='submit' className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm  mt-4 w-full">Create New User</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Usercreateform