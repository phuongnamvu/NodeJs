var express=require("express");
var path= require("path");// core module
var fs=require("fs");
const { request } = require("http");



const PORT=3000;
var empArr=[{empId:101,empName:"Sara",projectId:"P101"},
{empId:102,empName:"Keshav",projectId:"P101"},
{empId:103,empName:"Saurabh",projectId:"P102"},
{empId:104,empName:"Giri",projectId:"P102"},
{empId:105,empName:"Saraansh",projectId:"P103"},
{empId:106,empName:"Piyush",projectId:"P104"},
{empId:107,empName:"Neha",projectId:"P104"},
{empId:108,empName:"Priyam",projectId:"P105"},
{empId:109,empName:"Pranav",projectId:"P105"},
{empId:110,empName:"Puja",projectId:"P104"}];

var logPath=path.join(__dirname,"log","dailyLog.log")
var wStream=fs.createWriteStream(logPath,{flags:"a"});

var app=express();

//inbuilt middleware: 
app.use(express.urlencoded());// parse the urlencoded form data into object format
app.use(express.json());//parse the json data in the body section into json object

app.use(express.static("public"));

app.delete("/emp/:eId?",(request,response)=>{
    // no data in the body section
    var empInParams=request.params.eId;
    if(empInParams)
    {
        var pos=empArr.findIndex(item => item.empId == empInParams);
        if(pos >=0)
        {
            empArr.splice(pos,1);
            response.send(`Employee with employee Id : ${empInParams} deleted successfully`);
        }
        else
        {
            response.send(`No employee found with employee Id : ${empInParams}`);
        }
    }
    else
    {
        response.send("Employee Id to be deleted is missing")
    }
})

app.put("/emp/:eId",(request,response)=>{
    // update an existing record
    
    // url : /emp/101; body : datatoBeUpdated

    // check for data in body of request
    // check for empId as part of params in the request object
    // empId as part of body section
    // check for the existence of the record with the given empId

    var empToBeUpdated=request.body;
    var empIdInParams=request.params.eId;
    if(!empIdInParams)
    {
        response.send("Data missing in the params");
        return;
    }
    if(empToBeUpdated != {})
    {
        if(empToBeUpdated.empId)
        {
            if(empIdInParams == empToBeUpdated.empId)
            {
                // check for the existence of the record in empArray
                var pos= empArr.findIndex(item => item.empId == empIdInParams)
                if(pos >=0)
                {
                    // record is present
                    empArr[pos]=empToBeUpdated;
                    response.send("Data has been updated successfully")
                }
                else
                {
                    // record is not present
                    response.send("No record found with the matching empId");
                }
            }
            else
            {
                response.status(400).send("EmpId in the params and empId in the body do not match");
            }

        }
        else
        {
            response.status(400).send("Employee Id missing in the data to be updated");
        }
    }
    else
    {
        response.status(400).send("Data to be updated missing")
    }

})
// custom middleware to log the requests to a particular log file
app.use((request,response,next)=>{
    wStream.write(`\n${request.method};${request.url}; ${new Date()}`);
    next();// make it move to the next middleware(if it exists) or to the corresponding endpoint
})

// handle the various endpoints 
app.post("/login",(request,response)=>{
    var username=request.body.txtUserName;
    var password=request.body.txtPassword;
    // validate the username and password 
    //response.send(`Request received for username : ${username} and password : ${password}`);
    response.redirect("/home")
})
app.get("/login",(request,response)=>{
    var filePath=path.join(__dirname,"public","login.html");
    response.sendFile(filePath);
})
app.post("/emp",(request,response)=>{
    //inserting a new record
    // data -- body
    //http module ; data event and end event
    var empDataTobeInserted=request.body;
    console.log("Emp to be inserted",empDataTobeInserted);
    if((empDataTobeInserted != {}))
        if(empDataTobeInserted.empId)
     {
         var pos=empArr.findIndex(item => item.empId ==empDataTobeInserted.empId);
         if(pos >=0)
         {
            // record already exists;
             response.status(400);
             response.send("Employee Id to be inserted already exists");
         }
         else
         {
             // insertion allowed
             empArr.push(empDataTobeInserted);
             console.log("Employee arr",empArr);
             response.json(empArr);
         }
     }
     else
     {
         response.status(400).send("Please enter the employee Id.. EmployeeId misssing")
     }
    
})
app.get("/",(request,response)=>{
    response.send("Request received Thank U !!!!!!!");
})
app.get("/image",(request,response)=>{
    // send an image as a reponse 
    // image as a file -- readFile, streams
    // __dirname -- current project root folder
    // why path module is needed
    // 1. generate an absolute path 
    // 2. genertaing a normalised path based on os
    //windows o/s: C:\Users\anjum\OneDrive\Desktop\data 
    //  mac os : /home/       
    var filePath=path.join(__dirname,"flower.jpg");
    response.sendFile(filePath);
})
app.get("/toc",(request,response)=>{
    var filePath=path.join(__dirname,"TOC.pdf");
    response.sendFile(filePath);
})

app.get("/home",(request,response)=>{
    var filePath=path.join(__dirname,"index.html");
    response.sendFile(filePath);
})

app.get("/emp",(request,response)=>{
    response.json(empArr);
})


app.listen(PORT,(err)=>{
    console.log(`Server is running at ${PORT}`);
    //console.log(app);
})