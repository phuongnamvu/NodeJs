

const fs = require("fs");
// const directoryName = "log0762023"; 
const fileName = "dailyLog.log"; 
const fileContent = "07/06/2023";

// const generateddirectoryName = "log"+new Date().getDay()+new Date().getMonth()+new Date().getFullYear(); 

const directoryName = "log"+new Date().getDay()+new Date().getMonth()+new Date().getFullYear(); 
// console.log(generateddirectoryName)
console.log(directoryName);

// Create the directory 

fs.mkdir(directoryName, (err) => {
    if (err) {
        console.error("An error occurred while creating the directory: ", err); } 
        
    else {
        console.log("Directory created successfully!");

        // Create the file inside the directory
            fs.writeFile(`${directoryName}/${fileName}`, fileContent, (err) => {
            if (err) {
                    console.error("An error occurred while creating the file:", err);
            } 
                else {
    
                    // ﻿console.log("File created successfully!");
                    console.log("File created successfully !") ;
                }
            });

    }

});