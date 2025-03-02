import React from 'react'

const Tasklistnumbers = ({taskcount}) => {
    
    
  return (
    <div className='flex mt-10 justify-between gap-5 screen flex-wrap'>
        <div className="px-9 py-6 w-[45%] rounded-xl bg-red-400">
            <h2 className='text-2xl font-semibold '> {taskcount.new_task}</h2>
            <h3 className='text-xl font-medium'>
                New Task
            </h3>
        </div>
        <div className="px-9 py-6 w-[45%] rounded-xl bg-green-400">
            <h2 className='text-2xl font-semibold '>{taskcount.completed}</h2>
            <h3 className='text-xl font-medium'>
                Completed
            </h3>
        </div>
        <div className="px-9 py-6 w-[45%] rounded-xl bg-blue-400">
            <h2 className='text-2xl font-semibold '> {taskcount.active}</h2>
            <h3 className='text-xl font-medium'>
                Active
            </h3>
        </div>
        <div className="px-9 py-6 w-[45%] rounded-xl bg-yellow-400">
            <h2 className='text-2xl font-semibold '>{taskcount.failed}</h2>
            <h3 className='text-xl font-medium'>
                Failed
            </h3>
        </div>
    </div>
  )
}

export default Tasklistnumbers