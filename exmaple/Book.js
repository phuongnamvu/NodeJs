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


// var empArr=[{empId:101,empName:"Sara",projectId:"P101"},
// {empId:102,empName:"Keshav",projectId:"P101"},
// {empId:103,empName:"Saurabh",projectId:"P102"},
// {empId:104,empName:"Giri",projectId:"P102"},
// {empId:105,empName:"Saraansh",projectId:"P103"},
// {empId:106,empName:"Piyush",projectId:"P104"},
// {empId:107,empName:"Neha",projectId:"P104"},
// {empId:108,empName:"Priyam",projectId:"P105"},
// {empId:109,empName:"Pranav",projectId:"P105"},
// {empId:110,empName:"Puja",projectId:"P104"}]

const http = require("http");
const fs = require("fs");
const PORT = 3000;
const hostname = "localhost"

var empArr=[{"bookId":"1","bookName":"Developer1","bookAuthorName":"Romin1","bookPrize":"Irani1"},
{"bookId":"2","bookName":"Developer2","bookAuthorName":"Romin2","bookPrize":"Irani2"},
{"bookId":"3","bookName":"Developer3","bookAuthorName":"Romin3","bookPrize":"Irani3"},
{"bookId":"4","bookName":"Developer4","bookAuthorName":"Romin4","bookPrize":"Irani4"},
{"bookId":"5","bookName":"Developer5","bookAuthorName":"Romin5","bookPrize":"Irani5"},
{"bookId":"6","bookName":"Developer6","bookAuthorName":"Romin6","bookPrize":"Irani6"},
{"bookId":"7","bookName":"Developer7","bookAuthorName":"Romin7","bookPrize":"Irani7"},
{"bookId":"8","bookName":"Developer8","bookAuthorName":"Romin8","bookPrize":"Irani8"},
{"bookId":"9","bookName":"Developer9","bookAuthorName":"Romin9","bookPrize":"Irani9"},
{"bookId":"10","bookName":"Developer10","bookAuthorName":"Romin10","bookPrize":"Irani10"},
]
var app=http.createServer((request,response)=>{

    // console.log("Request method url", request.url);
    // urlObject = url.parse(request.url);
    // console.log("Parsed Url Object", urlObject);

    // PUT BOOK - RENAME 
    if (request.method == "PUT") {
        if (request.url == "/booker-Rename") {
            // data as part of body section
            // server ; request stream-- read stream
            var fullData = "";
            request.on("data", (chunk) => {
                fullData += chunk.toString();
            })
            request.on("end", () => {
                // var empToBeDeleted = JSON.parse(fullData);
                var bookToBeRename = JSON.parse(fullData);
                var pos = empArr.findIndex(item => item.bookId == bookToBeRename.bookId);

                if (pos >= 0) {
                    // bookId already exists; Deleted was successful
                    empArr[pos]=bookToBeRename;
                    empArr.push(bookToBeRename);
                    response.end(JSON.stringify(empArr));
                }
                else {
                    // bookId does not exists;
                    // empArr.push(empToBeInserted);
                    

                    response.end("bookId already exists. Deletetion could not be done");
                }
            })
            request.on("error", (err) => {
                response.statusCode = 401;
                response.end(`Error : ${err}`);
            })
        }
        else
        {
            response.end("Post request not allowed for this url")
        }
    }else
    
    // DELETE BOOK
    if (request.method == "DELETE") {
        if (request.url == "/booker-Delete") {
            // data as part of body section
            // server ; request stream-- read stream
            var fullData = "";
            request.on("data", (chunk) => {
                fullData += chunk.toString();
            })
            request.on("end", () => {
                // var empToBeDeleted = JSON.parse(fullData);
                var bookToBeDeleted = JSON.parse(fullData);
                var pos = empArr.findIndex(item => item.bookId == bookToBeDeleted.bookId);

                if (pos >= 0) {
                    // bookId already exists; Deleted was successful
                    empArr.splice(pos,1);

                    //  Read && Write :Json Book file
                    //  Add Here 

                    // Write to empArr Var 
                    empArr.push(bookToBeDeleted);
                    response.end(JSON.stringify(empArr));
                }
                else {
                    // bookId does not exists;
                    // empArr.push(empToBeInserted);
                    

                    response.end("bookId already exists. Deletetion could not be done");
                }
            })
            request.on("error", (err) => {
                response.statusCode = 401;
                response.end(`Error : ${err}`);
            })
        }
        else
        {
            response.end("Post request not allowed for this url")
        }
    }else


    // Read & Write : Json file

    var obj;
                    fs.readFile('books.json', 'utf8', function (err, data) {
                         if (err) throw err;
                         obj = JSON.parse(data);
                         var pos = obj.findIndex(item => item.bookId == empToBeDeleted.bookId);
                         console.log(pos);
                         if (pos >= 0) {
                              obj.splice(pos, 1);
                              
                              fs.writeFile("books.json", JSON.stringify(obj, null, 2), (err) => {
                                   if (err) {
                                       console.log(`Error during the write operation : ${err}`);
                                   }
                                   else {
                                       console.log("Write into the file is successful");
                                       response.end(JSON.stringify(obj));
                                   }
                               })
                             
                         }
                         else {
                              response.end("Book Id not exists.");
                         }

                        })
    // ADD BOOK    
    
    if (request.method == "POST") {
        if (request.url == "/booker") {
            // data as part of body section
            // server ; request stream-- read stream
            var fullData = "";
            request.on("data", (chunk) => {
                fullData += chunk.toString();
            })
            request.on("end", () => {
                var empToBeInserted = JSON.parse(fullData);
                var bookToBeInserted = JSON.parse(fullData);
                var pos = empArr.findIndex(item => item.bookId == empToBeInserted.bookId);

                if (pos >= 0) {
                    // bookId already exists; inform the client; Insert was not successful
                    response.end("bookId already exists. Insertion could not be done");
                }
                else {
                    // bookId does not exists;
                    // empArr.push(empToBeInserted);
                    empArr.push(bookToBeInserted);
                    response.end(JSON.stringify(empArr));
                }
            })
            request.on("error", (err) => {
                response.statusCode = 401;
                response.end(`Error : ${err}`);
            })
        }
        else
        {
            response.end("Post request not allowed for this url")
        }
    }else

    //  Draft : ADD BOOK 

    // if (request.method == "POST") {
    //     if (request.url == "/book") {
    //          var fullData = "";
    //          request.on("data", (chunk) => {
    //               fullData += chunk.toString();
    //          })
    //          request.on("end", () => {
    //               var bookToBeInserted = JSON.parse(fullData);
    //               console.log(bookToBeInserted);
                  
    //               var obj;
    //               fs.readFile('books.json', 'utf8', function (err, data) {
    //                    if (err) throw err;
    //                    obj = JSON.parse(data);
    //                    var pos = obj.findIndex(item => item.bookId == bookToBeInserted.bookId);
    //                    console.log(pos);
    //                    if (pos >= 0) {
    //                         response.end("Book Id already exists. Insertion could not be done");

                            
    //                    }
    //                    else {
    //                         obj.push(bookToBeInserted);
    //                         //it is not necessary, I used for sorting only
    //                         obj.sort(function(a, b) { 
    //                              return a.bookId - b.bookId ;
    //                            }); 

    //                         fs.writeFile("books.json", JSON.stringify(obj, null, 2), (err) => {
    //                              if (err) {
    //                                  console.log(`Error during the write operation : ${err}`);
    //                              }
    //                              else {
    //                                  console.log("Write into the file is successful")
    //                                                                        response.end(JSON.stringify(obj));
    //                              }
    //                          })

    //                         //response.end(JSON.stringify(obj));
    //                    }
    //               });

    //          })
    //          request.on("error", (err) => {
    //               response.statusCode = 401;
    //               response.end(`Error : ${err}`);
    //          })
    //     }




    // GET METHOD 

    if (request.method == "GET") {
        if (request.url == "/book") {
             //response.end(JSON.stringify(empArr));
             const rStream = fs.createReadStream("Book.json");
             //console.log(rStream.toString());
             //console.log(JSON.stringify(rStream));
             rStream.pipe(response);
             //response.end(JSON.stringify(response));//end -- string or buffer
    
             // response -- json data
            //  response.end(JSON.stringify(empArr));//end -- string or buffer
    
        }
    if (request.url == "/") {
        console.log("Inside get request for /")
        // return a html page -- homePage.html
        //response.write("homePage.html");// static content string
        fs.readFile("homePage.html", (err, data) => {
            if (err) {

                console.log(`Error in reading the file ${err}`);
                response.statusCode = 404;
                response.end("Error reading the home page");
                return;

            }
            else {
                console.log("After reading the file successfully")
                //default status code -- 200
                response.end(data);
                return;
            }
              
        })

    }
}
    else {
        response.end("Page Not found");
    }  
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})






