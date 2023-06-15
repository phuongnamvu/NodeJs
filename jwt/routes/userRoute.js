var express=require("express");
var userRouter=express.Router();
var path=require("path");


var {checkUserCredentials,addUser}= require("../controller/userController")



userRouter.get("/",(request,response)=>{
    var filePath=path.join(request.rootFolder,"public","register.html");
    response.sendFile(filePath);
})

userRouter.post("/",(request,response)=>{
    // register the user;
    // add the user to the db
    var userToBeAdded={userName:request.body.txtUserName,password:request.body.txtPassword};
    var result=addUser(userToBeAdded);
    if(result.statusCode ==200)
    {
        response.redirect("/login");
    }
    else
    {
        var filePath=path.join(request.rootFolder,"public","register.html");
        response.sendFile(filePath);
    }

    
})

module.exports=userRouter;