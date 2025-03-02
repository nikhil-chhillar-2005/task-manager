import { useContext,  useState, } from "react";
import Login from "./components/Auth/Login";
import Admindashboard from "./components/Dashboard/Admindashboard";
import Employedashboard from "./components/Dashboard/Employedashboard";
import { Auth } from "./context/Authprovider";


function App() {
  const auth=useContext(Auth);

  
  const [islogin]=auth.userapi.islogin;
  const [isadmin]=auth.userapi.isadmin;

  return (
    <div className="app ">
      {
        !islogin? <Login  />:''
      }
      {
        islogin && !isadmin?<Employedashboard/>:""
      }
      {
      isadmin?<Admindashboard  /> :'' 
}
     
    
    </div>
  );
}

export default App;
