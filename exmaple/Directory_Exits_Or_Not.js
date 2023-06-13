
const fs=require("fs");
const directory = "serverexp1";

fs.access(directory, fs.constants. F_OK, (err)=>{
    if (err) {
        // console.log(false);
        console.log("false");
    }
    else{
        // console.log(true);
        console.log("true");
    }
})


// // Step 2  
// const fs=require("fs");
// // const directory = "../serverexp";
// const directory = "serverexp1";

// //function IsExixst (dirName) {
// fs.stat (directory, (err, stat) => {
//     if (err) {
//         console.log('Directory not exists'); console.log(false);
    
//     }else {
//         console.log("Directory exists");
//         console.log(stat);
//         console.log(stat.isDirectory());
//     }
// })
