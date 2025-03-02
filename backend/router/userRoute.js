const Router=require('express').Router();
const auth =require('../Middleware/Auth')
const usercontroller=require("../controllers/usercontroler");
Router.post('/register' ,usercontroller.register);
Router.post('/login' ,usercontroller.login);
Router.post('/refreshtoken' ,usercontroller.refresh);
Router.get('/logout' ,usercontroller.logout);
Router.get('/getuser' ,auth,usercontroller.getuser);
Router.get('/getalluser' ,auth,usercontroller.getallusers);
Router.put('/update/:id' ,usercontroller.update);
Router.put('/accept/:id' ,auth,usercontroller.accept);
Router.put('/complete/:id' ,auth,usercontroller.complete);
Router.put('/failed/:id' ,auth,usercontroller.failed);

module.exports=Router