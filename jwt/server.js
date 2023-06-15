require("dotenv").config();
var express=require("express");
var path=require("path");

var userRouter=require("./routes/userRoute");
var loginRouter=require("./routes/loginRoute");


const PORT =process.env.PORT|| 3001;
var app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static("public"));

app.use((request,response,next)=>{
    request.rootFolder=__dirname;
    next();
})
// various endpoints
app.use("/register",userRouter);
app.get("/",(request,response)=>{
    var filePath=path.join(__dirname,"public","index.html");
    response.sendFile(filePath);
})

app.use("/login",loginRouter);




app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})