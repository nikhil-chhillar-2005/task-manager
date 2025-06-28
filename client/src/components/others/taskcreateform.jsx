import React, {  useContext, useState } from 'react'
import axios from 'axios'
import {Auth} from '../../context/Authprovider';
const Taskcreateform = () => {
  const [token]=useContext(Auth).token

  
  const [taskform, settaskform] = useState({
    task_title:"",
    date:"",
    assignto:"",
    category:"",
    discription:""
  });
  const handlechange=(e)=>{
    const {value,name}=e.target;
    settaskform({...taskform,[name]:value});
    
    
  }

  const onsubmithandle=async(e)=>{
    e.preventDefault();
    const newtask={
      title:taskform.task_title,
      description:taskform.discription,
      task_date:taskform.date,
      category:taskform.category,
      active:false,
      failed:false,
      new_task:true,
      completed:false
    }
    try {
      await axios.put(`/user/update/${taskform.assignto}`,newtask)
      const h1=document.createElement('h1');
            h1.classList="alert font-bold font-[32px] text-center"
            h1.textContent="Task  created";
            const form=document.querySelector('#taskform');
            form.prepend(h1);
            
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 5000);
    } catch (error) {
      console.log(error);
      
    }
    settaskform({
      task_title:"",
    date:"",
    assignto:"",
    category:"",
    discription:""
    })
  }

  return (
    <div>
        <div className="p-5 mt-7 rounded bg-[#1c1c1c]" id='taskform'>
      <form onSubmit={onsubmithandle} className="flex flex-wrap  items-center justify-between w-full  ">
        <div className="sm:w-1/2 w-full">
          <div >
            <h3 className="text-sm text-gray-500 mb-0.5">Task Title</h3>
            <input className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" value={taskform.task_title} name='task_title' onChange={handlechange} type="text" required placeholder="Make a UI design" />
          </div>
          <div >
            <h3 className="text-sm text-gray-500 mb-0.5">Date</h3>
            <input className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" value={taskform.date} name='date' onChange={handlechange} required type="date" />
          </div>
          <div >
            <h3 className="text-sm text-gray-500 mb-0.5">Assign to</h3>
            <input className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" value={taskform.assignto}  name='assignto' onChange={handlechange} type="number" required placeholder="Employee Id" />
          </div>
          <div >
            <h3 className="text-sm text-gray-500 mb-0.5">Category</h3>
            <input className="text-sm py-1 px-2 w-full sm:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" value={taskform.category} type="text" onChange={handlechange} name='category' required placeholder="design,dev,etc." />
          </div>
        </div>
        <div className="sm:w-2/5 w-full flex flex-col items-start ">
          <h3 className="text-sm text-gray-500 mb-0.5">Description</h3>
          <textarea className="text-sm w-full py-1 px-2  rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" name="discription" value={taskform.discription} onChange={handlechange} id="" required rows="10" cols={30}></textarea>
          <button type='submit' className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm  mt-4 w-full">Create Task</button>
        </div>

        
      </form>
    </div>
    </div>
  )
}

export default Taskcreateform