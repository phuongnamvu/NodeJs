
const fs=require("fs");

const http=require("http");
const PORT=3003;
const hostname="localhost"


var app=http.createServer((request,response)=>{

    if(request.method == "GET")
    {
        if(request.url == "/")
        {
            response.end("This is home page");// static content string
        }
        if(request.url == "/login")
        {
            const rStream=fs.createReadStream("login.html");
            rStream.pipe(response);
        }
    }
    else
    { 
    
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})