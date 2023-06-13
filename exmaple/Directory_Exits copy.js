const fs= require("fs"); 
let dirName = 'log07062023'; 

//function IsExixst (dirName) { 
    
fs.stat(dirName, (err,stat)=> 
    { 
    if (err) {
        console.log('Directory not exists'); console.log(true);
    }
    else {
        console.log("Directory exists");
        console.log(false);
    }
})