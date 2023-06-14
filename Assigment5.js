/*
Monday's Assignment:
1. Create a server using express
Todo obj : description, data, status(complete/pending),todoId
Create a todo app:
1. Add a new task to the to do list  -- post
2. Marking a task as complete -- put
3. Remove a task -- delete
4. List the various tasks -- get-- return the entire array
5. List the tasks which are complete -- get request with params; /todo/complete -- return the records for which status is complete
 
*/


var express=require("express");
var path=require("path"); // core Module 

var fs=require("fs");
const{request}=require("http");

const PORT=3000;

//  Not : Use 
// var booArr1=require("./Book.json");
//  File : json 
// var bookArr=[
//     {
//       "bookId": "1",
//       "bookName": "Developer1",
//       "bookAuthorName": "Romin1",
//       "bookPrize": "Irani1"
//     },
//     {
//       "bookId": "2",
//       "bookName": "Developer2",
//       "bookAuthorName": "Romin2",
//       "bookPrize": "Irani2"
//     },
//     {
//       "bookId": "3",
//       "bookName": "Developer3",
//       "bookAuthorName": "Romin3",
//       "bookPrize": "Irani3"
//     },
//     {
//       "bookId": "4",
//       "bookName": "Developer4",
//       "bookAuthorName": "Romin4",
//       "bookPrize": "Irani4"
//     },
//     {
//       "bookId": "5",
//       "bookName": "Developer5",
//       "bookAuthorName": "Romin5",
//       "bookPrize": "Irani5"
//     },
//     {
//       "bookId": "6",
//       "bookName": "Developer6",
//       "bookAuthorName": "Romin6",
//       "bookPrize": "Irani6"
//     },
//     {
//       "bookId": "7",
//       "bookName": "Developer7",
//       "bookAuthorName": "Romin7",
//       "bookPrize": "Irani7"
//     },
//     {
//       "bookId": "8",
//       "bookName": "Developer8",
//       "bookAuthorName": "Romin8",
//       "bookPrize": "Irani8"
//     },
//     {
//       "bookId": "9",
//       "bookName": "Developer9",
//       "bookAuthorName": "Romin9",
//       "bookPrize": "Irani9"
//     },
//     {
//       "bookId": "10",
//       "bookName": "Developer10",
//       "bookAuthorName": "Romin10",
//       "bookPrize": "Irani10"
//     }    
//   ]



//  Declare Path & Write Json 
var logPath=path.join(__dirname,"log","dailyLog.log")
var wStream=fs.createWriteStream(logPath,{flags:"a"});

var longPath=path.join(__dirname,"log1","dailylog1.log");
var wStream =fs.createWriteStream(logPath,{flags:"a"});

//  Call : Express Framework 
var app=express();


// Json : File 
// var todoList=require["./toDoList.json"];
// var todoList=["./toDoList.json"];
var todoList=[{
    "toDoId": "1",
    "Description": "Run ",
    "Data": "100m",
    "Status": "Completed"
  },

  {
    "toDoId": "2",
    "Description": "Swim ",
    "Data": "20m",
    "Status": "Pending"
  }];



//inbuilt middleware: 
app.use(express.urlencoded());// parse the urlencoded form data into object format
app.use(express.json());//parse the json data in the body section into json object

//  Folder : Public 
app.use(express.static("public"));

// custom middleware to log the requests to a particular log file
app.use((request,response,next)=>{
    wStream.write(`\n${request.method};${request.url}; ${new Date()}`);
    next();// make it move to the next middleware(if it exists) or to the corresponding endpoint
})


//  Method GET 


app.get('/task/:id?', (req, res) => {
// Find TaskID  
    const taskId= req.params.id; 

    if(!taskId) {
        res.status(404).send('The request missing params');
    } 
    else{
        // Check TaskID Exits or Not 
            for (let task of todoList) {
                 if (task.toDoId == taskId) {
                res.json(task);
                return;
                 }
            }   
            // Not Exits 
            res.status(404).send('The task not found');
    }        
})
app.get("/tasker2",(req,res)=>{
    res.json(todoList);
})

app.get("/tasker",(request,response)=>{
    response.json(todoList);
})

//  Listen : Event 
app.listen(PORT,(err)=>{
    console.log(`Server is runing at ${PORT}`);
})

