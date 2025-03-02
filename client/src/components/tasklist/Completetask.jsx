import React from 'react'

const Completetask = ({task,key}) => {
  return (
    <div key={key}>
         <div className=' flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
         <div className="flex items-center  justify-between">
          <h3 className="bg-red-600 px-3 py-1 rounded text-sm">
            {task.category}
          </h3>
          <h4 className="text-sm">{task.task_date}</h4>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{task.title}</h2>
        <p className="text-sm mt-2">{task.description}</p>
        <div className="mt-4 flex justify-center">
            <button className='bg-blue-500 rounded py-1 px-2 text-sm'>Completed</button>
            
        </div>
          
      </div>
    </div>
  )
}

export default Completetask