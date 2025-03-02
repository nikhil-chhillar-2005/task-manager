import React,{useContext} from "react";
import { Auth } from '../../context/Authprovider';
import axios from 'axios';
const Newtask = ({ task,key }) => {
  const state=useContext(Auth);
  const [user]=state.userapi.user;
  const [token]=state.token
  
const accept=async(title)=>{
 try {
    await axios.put(`/user/accept/${user.Id}`,{
    title:title
  },{
      headers:{Authorization:token}
  })
 } catch (error) {
  const h1Element = document.createElement('h1');
            h1Element.textContent = error.response.data;               
            document.body.prepend(h1Element);
  console.log(error.response.data);
 }
}
  return (
    <div key={key}>
      <div className=" flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
        <div className="flex items-center  justify-between">
          <h3 className="bg-red-600 px-3 py-1 rounded text-sm">
            {task.category}
          </h3>
          <h4 className="text-sm">{task.task_date}</h4>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{task.title}</h2>
        <p className="text-sm mt-2">{task.description}</p>
        <div className="mt-4 flex justify-center">
            <button onClick={()=>{
              accept(task.title)
            }} className='bg-yellow-500 py-1 px-3 rounded text-sm'>Accept task</button>
            
        </div>
      </div>
    </div>
  );
};

export default Newtask;
