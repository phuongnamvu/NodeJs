var userArr=[
    {userName:"sara",password:"sara"}
];

function addUser(user)
{
    var pos=userArr.findIndex(item => item.userName == user.userName);
    if(pos >=0)
    {
        return ({msg:"Username already exists",statusCode:401});
    }
    else
    {
        userArr.push(user);
        return ({msg:"Username added successfully",statusCode:200});
    }
}

function checkUserCredentials(user)
{
    var pos=userArr.findIndex(item => item.userName == user.userName);
    if(pos >=0)
    {
        if(userArr[pos].password == user.password)
            return ({msg:true,statusCode:200});
        else
        {
            return ({msg:false,statusCode:401});
        }

    }
    else
    {
        
        return ({msg:false,statusCode:401});
    }
}

module.exports={addUser,checkUserCredentials}