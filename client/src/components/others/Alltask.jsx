import React, { useContext } from "react";
import { Auth } from "../../context/Authprovider";

const Alltask = () => {
  const [alluser] = useContext(Auth).userapi.alluser;
  

  return (
    <div id="tasklist" className="bg-[#1c1c1c] p-5 mt-5  rounded  ">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h2 className="text-lg font-medium w-1/5">New Task</h2>
        <h2 className="text-lg font-medium w-1/5">Active Task</h2>
        <h2 className="text-lg font-medium w-1/5">Completed</h2>
        <h2 className="text-lg font-medium w-1/5">Failed</h2>
      </div>
      <div>
        {alluser.map((employee,idx) => {
          return (
            <div key={idx} className="border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between">
              <h2 className="text-lg font-medium w-1/5 ">{employee.name}</h2>
              <h2 className="text-lg font-medium w-1/5">{employee.taskcount.new_task}</h2>
              <h2 className="text-lg font-medium w-1/5">{employee.taskcount.active}</h2>
              <h2 className="text-lg font-medium w-1/5">{employee.taskcount.completed}</h2>
              <h2 className="text-lg font-medium w-1/5">{employee.taskcount.failed}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alltask;
