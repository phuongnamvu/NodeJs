var empArr = require("../model/empModel.js");

function addEmployee(empToBeAdded) {
    if (!empToBeAdded.empId) {
        return ("EmpId missing, Insertion could not be done")
    }
    var pos = empArr.findIndex(item => item.empId == empToBeAdded.empId);
    if (pos >= 0) {
        // record already exists;
        return ("Employee Id to be inserted already exists");
    }
    else {
        // insertion allowed
        empArr.push(empToBeAdded);
        console.log("Employee arr", empArr);
        return ("Employee Id inserted successfully");
    }

}

function deleteEmployee(empToBeDeleted) {
    var pos = empArr.findIndex(item => item.empId == empToBeDeleted);
    if (pos >= 0) {
        // record already exists;
        empArr.splice(pos,1);
        return ({statusCode:200,data:"Data deleted successfully"});
    }
    else {
        // record not found
        return ({statusCode:400,data:"EmpId to be deleted not found"});
        
    }
}

function modifyEmployee(empToBeUpdated) {
    var pos = empArr.findIndex(item => item.empId == empToBeUpdated.empId);
    if (pos >= 0) {
        // record already exists;
        empArr[pos]=empToBeUpdated;
        return ({statusCode:200,data:empToBeUpdated});
    }
    else {
        // record not found
        return ({statusCode:400,data:"EmpId to be updated not found"});
        
    }
}

function getEmployee(empId) {
    var obj=empArr.find(item => item.empId == empId);
    // if empId is present, obj will contain the record
    // If empId is not present, obj will be ud;
    if(obj)
    {
        return ({statusCode:200,data:obj});
    }
    else
    {
        return ({statusCode:400,data:"EmpId not found"})
    }
}

function getAllEmployees(request,response) {
    response.json(empArr);
}

module.exports = { addEmployee, deleteEmployee, modifyEmployee, getAllEmployees, getEmployee }