var express=require("express");
var path= require("path");// core module
var fs=require("fs");
const { response } = require("@hapi/hapi/lib/validation");
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
    response.redirect("/home");// get request to /home
})

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

app.put("/emp/:eId?",(request,response)=>{
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

app.get("/products/:pId/category/:categoryName",(request,response)=>{
    // "/products/101/category/laptops"
    var productId=request.params.pId;
    var categoryName=request.params.categoryName;
    
})

app.get("/book",(request,response)=>{
    //http://localhost:3000/book?bookId=12&bookName=ANand
    
    response.send(`Book Id : ${request.query.bookId}, BookName : ${request.query.bookName}}`);


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
/*
Express -- Framework built over nodejs
-- easy to code/manage/ maintain
-- Middlewares Functions which have a specific functionality ; Make some transformations to request/response before it hits the exact endpoint
-- Template languages Handlebar, pug -- templating for my front end code
-- Security / encryption
-- Working with Js
-- MEAN , MERN ; Mongodb, Express, Angular/React, Nodejs 
-- lightweight framework
-- Modularity
-- works with MVC architecture
    -- M --Model -- data needed for the application
    -- V -- View -- front end view of the application
    -- C -- Controller -- Bridge between view and controller
*/

/*
npm -- Node Package Manager
-- Install modules
-- Uninstall modules
-- Upgrades modules
npm install -g express ;// Global installation ; install it and it will be avialable in all the folders
npm install express --save ;// local installation in the respective project folder; save it as a dependency in the package.json file
npm install express --saveDev ;// local installation in the respective project folder; save it as a development dependency in the package.json file

package.json 
-- Important configuration file
-- Module Dependencies of the project
-- Version of the modules
-- Create the package.json
    npm init
    Ask for some questions. Based on the answers the package.json file will be created


    Install all the dependencies present in package.json:
    npm install 

    Folder structure of express server
    1. public folder
        -- folder for storing the static resources
        -- resources needed as part of front end
        -- images, html pages, css pages, javascript(client end)
    2. routes
        -- Number of routes.js
        -- Various routes will be handled in different files
    3. views
        -- Templating using the view languages
        -- master pages, layout pages
    4. Controller 
        -- controller's code
    5. Model 
        -- Code to talk with the database
    6. node_modules
        -- All the module dependencies as mentioned in package.json

Middlewares
    -- Functions
    -- Inbuilt middlewares / custom middlewares
    -- Call the Inbuilt middlewares as part of app.use()
    -- Custom Middleware --Write the function definition inside the app.use
    -- Transform the req and response object before it has the corresponding endpoint
    -- Logging 
    -- Authentication and authorisation of the client and request
    -- Can we multiple middlewares -- YES
    -- Order of call of middlewares -- order in which they have been written
    --Custom middleware -- next() ; Mandatory
    -- Control will not flow if i dont add the next();
*/

/*
Assignnments:
1. Server  -- http module
     4 Endpoints
     get,post,put,delete to /books
IN a seperate file : books.json: 10 books details
get -- return the books in books.json
post -- add a new book after validation to file books.json
put/delete -- respective task;



*/

//login.html

<!DOCTYPE html>
<html lang="en">
<html>
	<head>
		<title>Login</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- CSS only -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
		<style>
		</style>
	</head>

	<body>
	
	<div class="container-fluid bg-dark border " style="height:100vh;">
	<div class="pt-5 pb-5 offset-sm-3 col-md-6">
		 <form class=" border rounded bg-light p-2" method="post" action="/login">
			<div class="form-group">
				<label for="txtUserName">User Name</label>
				<input type="text" name="txtUserName" class="form-control w-100"/> <!--25.50.75.100 are possible,we can also use h to set height-->
			</div>
			<div class="form-group">
				<label for="txtPassword">Password</label>
				<input type="password" name="txtPassword" class="form-control w-100"/>
			</div>
			<div class="form-group">
				<label>Country</label>
					<select class="form-control w-100">
						<option>Choose Country</option>
						<option>America</option>
						<option>Canada</option>
						<option>India</option>
						<option>Pakisthan</option>
					</select>
				</label>
			</div>
			<div>
				<input type="checkbox" class="form-check-input ml-1"/>
				<label class="form-check-label ml-4">Remember me</label>
			</div>
			<div class="form-group">
			<div class="row">
					<div class="col-3 m-1 "> <input type="submit" value="Login" class="btn btn-primary text-light"/> </div>
					<div class="col-3 m-1 "> <input type="reset" value="Reset"  class="btn btn-secondary"/> </div>
					<div class="col-md-2 mr-1"> <input type="button" value="Forgot PassWord"  class="btn btn-warning"/> </div>
			</div>
			</div>
			</div>
		</form>	
		<!--  <br><br><br><br><br><br><br><br><br><br> -->
	</div>
	<!-- JS, Popper.js, and jQuery -->
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
	</body>
</html>

//index.html

<html>
<head>
  <title>Express HTML</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
</head>
<body>
  <div style="margin:100px;">
    <nav class="navbar navbar-inverse navbar-static-top">
  <div class="container">
    <a class="navbar-brand" href="/">HTML</a>
    <ul class="nav navbar-nav">
      <li class="active">
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/sitemap">Sitemap</a>
      </li>
    </ul>
  </div>
</nav>
    <div class="jumbotron"  style="padding:40px;">
      <h1>Hello, world!</h1>
      <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
      <form>
        <input type="text" name="txtUserName" />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  </div>
</body>
</html>

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




