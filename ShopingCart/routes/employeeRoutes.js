var express=require("express");
var {addEmployee,getAllEmployees,getEmployee,modifyEmployee,deleteEmployee}=require("../controller/employeeController.js");

var router=express.Router();
console.log("Inside the employee router");
// router.get("/",(request,response)=>{
//     // return all the data
//     //call the corresponding controller function
//     var result=getAllEmployees();
//     response.json(result);
// })
router.get("/",getAllEmployees);

router.get("/:eId?",(request,response)=>{
    var empId=request.params.eId;
    if(!empId)
    {
        response.send("EmpId missing, details could not be fetched");
    }
    else
    {
        var result=getEmployee(empId);
        response.status(result.statusCode).send(result.data);
    }
})

router.post("/",(request,response)=>{
    // "/employee"
    console.log("POST request received for /employee")
    var empToBeAdded=request.body;
    var result=addEmployee(empToBeAdded);
    response.send(result);
})

router.put("/:eId?",(request,response)=>{
    var empId=request.params.eId;
    var empIdInBody=request.body.empId;
    if(!empId || !empIdInBody)
    {
        response.send("EmpId is missing, Update not possible");
    }
    else
    {
        if(empId == empIdInBody)
        {
            var empToBeUpdated=request.body;
            var result=modifyEmployee(empToBeUpdated);
            response.status(result.statusCode).send(result.data);
        }
        else
        {
            response.send("Mismatch in data in body and params")
        }
    }
})

router.delete("/:eId?",(request,response)=>{
    var empDataTobeDeleted=request.params.eId;
    if(empDataTobeDeleted)
    {
        var result=deleteEmployee(empDataTobeDeleted);
        response.status(result.statusCode).send(result.data);
    }
    else
    {
        response.send("Employee Id to be deleted is missing in the params");
    }
})

module.exports=router;