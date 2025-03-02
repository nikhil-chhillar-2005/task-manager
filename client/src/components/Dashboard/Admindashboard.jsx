import React, { useContext } from "react";
import Header from "../others/Header";
import Taskcreateform from '../others/taskcreateform'
import Alltask from "../others/Alltask";
import { Auth } from "../../context/Authprovider";
import Usercreateform from "../others/Usercreateform";
const Admindashboard = ({data}) => {
  const auth=useContext(Auth);
  const [user]=auth.userapi.user;
  
  return (
    <div className="h-screen w-full   p-10">
      <Header name={user.name} />
      <Taskcreateform />
      <Alltask/>
      <Usercreateform/>
    </div>
  );
};

export default Admindashboard;
