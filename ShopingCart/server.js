var express=require("express");
var fs=require("fs");
var path=require("path");
const PORT =3000;
var morgan=require("morgan");

var empRouter=require("./routes/employeeRoutes")

var app=express();

app.set("port",PORT);
// middlewares 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/employee",empRouter);
// endPoint
app.get("/",(request,response)=>{
    // return Home Page 
    var filePath=path.join(__dirname,"public","homePage.html") 
    response.sendFile(filePath);

})

// endpoint 



app.listen(PORT,(err)=>{
    if(!err)
    {
        console.log(`Server is running at port : ${PORT}`);
    }
    else
    {
        console.log(err)
    }
})

// app.listen(PORT,(err)=>{

//     if(!err)
//     {

//         console.log(`Server is runing at port `);
//     }else{
//         console.log(err);
//     }
// })