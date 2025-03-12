import React, { useContext } from 'react'
import { Auth } from '../../context/Authprovider';
import axios from 'axios';

const Accepttask = ({task,key}) => {
  const state=useContext(Auth);
  const [user]=state.userapi.user;
  const [token]=state.token
  const completed=async(title)=>{
    try {
      await axios.put(`${process.env.REACT_APP_API_LINK}/user/complete/${user.Id}`,{
        title:title
      },{
          headers:{Authorization:token}
      })
    } catch (error) {
      const h1Element = document.createElement('h1');
            h1Element.textContent = error.response.data; 
            document.body.prepend(h1Element);
    }
    
  }
  const failed=async(title)=>{
    try {
      await axios.put(`${process.env.REACT_APP_API_LINK}/user/failed/${user.Id}`,{
        title:title
      },{
          headers:{Authorization:token}
      })
    } catch (error) {
      const h1Element = document.createElement('h1');
            h1Element.textContent = error.response.data; 
           
              
            document.body.prepend(h1Element);
    }
    
  }

  return (
    <div key={key}>
         <div className=' flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
         <div className="flex items-center  justify-between">
          <h3 className="bg-red-600 px-3 py-1 rounded text-sm">
            {task.category}
          </h3>
          <h4 className="text-sm">{task.task_date}</h4>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{task.title}</h2>
        <p className="text-sm mt-2">{task.description}</p>
        <div className="mt-4 flex justify-center gap-5">
            <button className='bg-green-500 rounded py-1 px-2 text-sm' onClick={()=>{
              completed(task.title);
            }}>Mark as completed</button>
            <button onClick={()=>{
              failed(task.title)
            }} className='bg-red-500 rounded py-1 px-2 text-sm'>Mark as failed</button>
        </div>
      </div>
    </div>
  )
}

export default Accepttask