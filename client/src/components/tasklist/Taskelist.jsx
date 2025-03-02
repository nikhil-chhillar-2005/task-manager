import React from 'react'
import Accepttask from './Accepttask'
import Completetask from './Completetask'
import Newtask from './Newtask'
import Failedtask from './Failedtask'

const Taskelist = ({tasks}) => {
  return (
    <div id='tasklist' className=' flex overflow-y-auto overflow-x-scroll p-1 items-center justify-start gap-5 flex-nowrap  w-full  mt-10'>
    {
        tasks.map((task)=>{
            if(task.active) return <Accepttask task={task}/> 
            else if(task.completed) return <Completetask key={task.Id}  task={task}/>
            else if(task.new_task) return <Newtask key={task.Id}  task={task}/>
            else if(task.failed) return <Failedtask key={task.Id}  task={task}/>
            else return ''
        })
    }      
      
    </div>
  )
}

export default Taskelist